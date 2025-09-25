#include <windows.h>
#include <winioctl.h>
#include <string>
#include <iostream>

// ATA command definitions
#define ATA_CMD_SECURITY_ERASE_PREPARE 0xF3
#define ATA_CMD_SECURITY_ERASE_UNIT    0xF4

bool ataSecureErase(const std::string &drivePath) {
    // drivePath example: "\\\\.\\PhysicalDrive1"
    HANDLE hDevice = CreateFileA(
        drivePath.c_str(),
        GENERIC_READ | GENERIC_WRITE,
        FILE_SHARE_READ | FILE_SHARE_WRITE,
        NULL,
        OPEN_EXISTING,
        0,
        NULL
    );

    if (hDevice == INVALID_HANDLE_VALUE) {
        std::cerr << "Error opening drive: " << GetLastError() << std::endl;
        return false;
    }

    ATA_PASS_THROUGH_EX apt = {0};
    BYTE buffer[512] = {0};
    DWORD bytesReturned = 0;

    // Step 1: SECURITY ERASE PREPARE
    ZeroMemory(&apt, sizeof(apt));
    apt.Length = sizeof(ATA_PASS_THROUGH_EX);
    apt.AtaFlags = ATA_FLAGS_DATA_OUT;
    apt.DataTransferLength = sizeof(buffer);
    apt.TimeOutValue = 10;
    apt.DataBufferOffset = sizeof(ATA_PASS_THROUGH_EX);
    apt.CurrentTaskFile[6] = ATA_CMD_SECURITY_ERASE_PREPARE;

    if (!DeviceIoControl(hDevice,
                         IOCTL_ATA_PASS_THROUGH,
                         &apt,
                         sizeof(apt) + sizeof(buffer),
                         &apt,
                         sizeof(apt) + sizeof(buffer),
                         &bytesReturned,
                         NULL)) {
        std::cerr << "Erase Prepare failed: " << GetLastError() << std::endl;
        CloseHandle(hDevice);
        return false;
    }

    // Step 2: SECURITY ERASE UNIT
    ZeroMemory(&apt, sizeof(apt));
    apt.Length = sizeof(ATA_PASS_THROUGH_EX);
    apt.AtaFlags = ATA_FLAGS_DATA_OUT;
    apt.DataTransferLength = sizeof(buffer);
    apt.TimeOutValue = 60 * 5; // 5 min timeout (can take longer for large drives)
    apt.DataBufferOffset = sizeof(ATA_PASS_THROUGH_EX);
    apt.CurrentTaskFile[6] = ATA_CMD_SECURITY_ERASE_UNIT;

    if (!DeviceIoControl(hDevice,
                         IOCTL_ATA_PASS_THROUGH,
                         &apt,
                         sizeof(apt) + sizeof(buffer),
                         &apt,
                         sizeof(apt) + sizeof(buffer),
                         &bytesReturned,
                         NULL)) {
        std::cerr << "Erase Unit failed: " << GetLastError() << std::endl;
        CloseHandle(hDevice);
        return false;
    }

    CloseHandle(hDevice);
    return true;
}
