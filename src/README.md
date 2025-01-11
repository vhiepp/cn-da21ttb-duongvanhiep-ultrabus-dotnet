## Lược đồ cơ sở dữ liệu
```mermaid
erDiagram
    Users {
        Id Uuid "Primary"
        FirstName NVarchar(50) "Required"
        LastName NVarchar(50) "AllowNull"
        Gender Byte "Enum (Nam = 1, Nu = 2, Khac = 3)"
        DateOfBirth Date "AllowNull"
        Email Varchar(50) "AllowNull, Unique"
        Phone Varchar(12) "Required, Unique"
        IsSuperAdmin Boolean "Default = False"
        IsCustomer Boolean "Default = True"
        RoleId Uuid "AllowNull"
        WardId Uuid "AllowNull"
        DistrictId Uuid "AllowNull"
        ProvinceId Uuid "AllowNull"
        FullAddress NVarchar "Required"
        CreatedAt Datetime "NotNull"
        UpdatedAt Datetime "NotNull"
    }

    
    Permissions {
        Id Uuid "Primary"
        Name NVarchar(50) "Required, Unique"
        Key Varchar(30) "Required, Unique"

        CreatedAt Datetime "NotNull"
        UpdatedAt Datetime "NotNull"
    }
    Roles {
        Id Uuid "Primary"
        Name NVarchar(50) "Required, Unique"
        CreatedAt Datetime "NotNull"
        UpdatedAt Datetime "NotNull"
    }
    RolePermissions {
        RoleId Uuid "Required"
        PermissionId Uuid "Required"
    }
    Permissions ||--o{ RolePermissions : ""
    Roles ||--o{ RolePermissions : ""
    Roles ||--o{ Users : ""

    BusTypes {
        Id Uuid "Primary"
        Name NVarchar(50) "Required, Unique"
        Manufacturer Varchar(30) "Required, Unique"
        Seats LongText "Required, Json"
        NumberOfSeats Byte "Required, Min = 1, Max = 60"
        CreatedAt Datetime "NotNull"
        UpdatedAt Datetime "NotNull"
    }
    Buses {
        Id Uuid "Primary"
        Name NVarchar(50) "Required, Unique"
        LicensePlate Varchar(30) "Required, Unique"
        Seats LongText "Required, Json"
        TypeId Uuid "Required"
        NumberOfSeats Byte "Required, Min = 1, Max = 60"
        CreatedAt Datetime "NotNull"
        UpdatedAt Datetime "NotNull"
    }
    BusTypes ||--o{ Buses : ""

    Provinces {
        Id Uuid "Primary"
        Name NVarchar "Unique"
        CreatedAt Datetime "NotNull"    
        UpdatedAt Datetime "NotNull"
    }
    Districts {
        Id Uuid "Primary"
        Name NVarchar "Unique"
        CodeName Varchar(30) "Required, Unique"
        ProvinceId Uuid "Required"
        CreatedAt Datetime "NotNull"    
        UpdatedAt Datetime "NotNull"
    }
    Wards {
        Id Uuid "Primary"
        Name NVarchar "Unique"
        
        DistrictId Uuid "Required"
        
        CreatedAt Datetime "NotNull"    
        UpdatedAt Datetime "NotNull"
    }
    Provinces ||--o{ Districts : ""
    Districts ||--o{ Wards : ""
    Wards ||--o{ Users : ""
    Districts ||--o{ Users : ""
    Provinces ||--o{ Users : ""
```
