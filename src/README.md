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
        RoleId Uuid "Required"
        CreatedAt Datetime "NotNull"
        UpdatedAt Datetime "NotNull"
    }
    Accounts {
        Id Uuid "Primary"
        UserId Uuid "Required"
        Username Varchar(50) "Required, Unique"
        Password Varchar(200) "Required"
        Provider Varchar(20) "Required"
        ProviderId Varchar(50) "Required, Unique"
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
    Users ||--o{ Accounts : ""
    Roles ||--o{ Users : ""
```