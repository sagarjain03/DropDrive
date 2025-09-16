#include <napi.h>
#include <string>
#include <vector>
#include <cstdlib>
#include <fstream>
#include <algorithm>
#include <cstring>
#include "wipeMethods/zeroFill.cpp"
#include "wipeMethods/randomFill.cpp"
#include "wipeMethods/nistWipe.cpp"
#include "wipeMethods/nistZeroWipe.cpp"
#include "wipeMethods/dodWipe.cpp"
// #include "wipeMethods/dod.cpp"      <-- Add later for DoD, NIST, Gutmann, etc.

Napi::Value WipeFile(const Napi::CallbackInfo& info) { 
    Napi::Env env = info.Env();

    if (info.Length() < 2) {
        Napi::TypeError::New(env, "Path and method required").ThrowAsJavaScriptException();
        return env.Null();
    }
    std::string path = info[0].As<Napi::String>();
    std::string method = info[1].As<Napi::String>();

    bool result = false;
    if (method == "nist")          result = nistWipe(path);
    else if (method == "nistzero") result = nistZeroWipe(path);
    else if (method == "dod")      result = dodWipe(path);
    else if (method == "zero") {
        result = zeroFill(path);
    } else if (method == "random") {
        result = randomFill(path);
    } /* else if (method == "dod") {
        // result = dodFill(path);
    } ... add other methods here ... */
    else {
        Napi::Error::New(env, "Invalid wipe method").ThrowAsJavaScriptException();
        return env.Null();
    }

    if (result)
        return Napi::String::New(env, "Wipe completed with method: " + method);
    else
        return Napi::String::New(env, "Wipe error or could not open file.");
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("wipeFile", Napi::Function::New(env, WipeFile));
    return exports;
}

NODE_API_MODULE(wipeAddon, Init)
