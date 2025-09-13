#include <napi.h>
#include <string>
#include <fstream>

void fillBuffer(char* buffer, size_t size, int pattern) {
    if (pattern == 0) { // Zeros
        memset(buffer, 0, size);
    } else { // Random
        for (size_t i = 0; i < size; ++i)
            buffer[i] = rand() % 256;
    }
}

Napi::Value WipeFile(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info.Length() < 2) {
        Napi::TypeError::New(env, "Path and method required").ThrowAsJavaScriptException();
        return env.Null();
    }

    std::string path = info[0].As<Napi::String>();
    std::string method = info[1].As<Napi::String>();
    int pattern = (method == "random") ? 1 : 0;

    // Open file for read/write, binary
    std::fstream file(path, std::ios::in | std::ios::out | std::ios::binary);
    if (!file.is_open()) {
        return Napi::String::New(env, "Failed to open file for wiping");
    }

    // Get file size
    file.seekg(0, std::ios::end);
    std::streampos filesize = file.tellg();
    file.seekp(0, std::ios::beg);

    const size_t BUF_SIZE = 4096;
    char buffer[BUF_SIZE];
    size_t blocks = filesize / BUF_SIZE;
    size_t leftover = filesize % BUF_SIZE;

    for (size_t i = 0; i < blocks; ++i) {
        fillBuffer(buffer, BUF_SIZE, pattern);
        file.write(buffer, BUF_SIZE);
    }
    if (leftover > 0) {
        fillBuffer(buffer, leftover, pattern);
        file.write(buffer, leftover);
    }
    // Force output to disk
    file.flush();
    file.close();

    return Napi::String::New(env, "Wipe completed");
}
