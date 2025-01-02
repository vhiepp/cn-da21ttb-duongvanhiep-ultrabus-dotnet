using System.Text.Json;

namespace UltraBusAPI.Datas.Seeders
{
    public static class AddressSeeder
    {
        public static double? ConvertStringToDouble(string? input)
        {
            if (string.IsNullOrWhiteSpace(input))
            {
                return null; // Chuỗi rỗng trả về null
            }

            // Thử chuyển đổi chuỗi sang double
            if (double.TryParse(input, out double result))
            {
                return result; // Chuyển đổi thành công, trả về giá trị double
            }

            return null; // Chuyển đổi thất bại, trả về null
        }

        public static void SeedData(IServiceProvider serviceProvider)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<MyDBContext>();

                // Đảm bảo cơ sở dữ liệu đã được tạo
                context.Database.EnsureCreated();

                // Kiểm tra nếu bảng đã có dữ liệu
                if (!context.Provinces.Any())
                {
                    // Đọc file JSON
                    var jsonFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Storages\\Data", "address.json");

                    Console.WriteLine(jsonFilePath);

                    var jsonData = File.ReadAllText(jsonFilePath);

                    // Deserialize JSON thành danh sách User
                    //var address = JsonSerializer.Deserialize<List<object>>(jsonData);
                    JsonDocument jsonDoc = JsonDocument.Parse(jsonData);

                    // Duyệt qua các phần tử trong JSON
                    JsonElement address = jsonDoc.RootElement;

                    if (address.ValueKind == JsonValueKind.Array)
                    {
                        foreach (var province in address.EnumerateArray())
                        {
                            Console.WriteLine(province.GetProperty("name").GetString());
                            Console.WriteLine(province.GetProperty("name_en").GetString());
                            Console.WriteLine(province.GetProperty("full_name").GetString());
                            Console.WriteLine(province.GetProperty("full_name_en").GetString());
                            Console.WriteLine(province.GetProperty("latitude").GetString());
                            Console.WriteLine(province.GetProperty("longitude").GetString());
                            var newProvince = new Province()
                            {
                                Name = province.GetProperty("name").GetString(),
                                NameEnglish = province.GetProperty("name_en").GetString(),
                                FullName = province.GetProperty("full_name").GetString(),
                                FullNameEnglish = province.GetProperty("full_name_en").GetString(),
                                Latitude = ConvertStringToDouble(province.GetProperty("latitude").GetString()),
                                Longitude = ConvertStringToDouble(province.GetProperty("longitude").GetString())
                            };
                            context.Provinces.Add(newProvince);
                            context.SaveChanges();
                            var districtArray = province.GetProperty("data2");
                            foreach (var district in districtArray.EnumerateArray())
                            {
                                var newDistrict = new District
                                {
                                    Name = district.GetProperty("name").GetString(),
                                    NameEnglish = district.GetProperty("name_en").GetString(),
                                    FullName = district.GetProperty("full_name").GetString(),
                                    FullNameEnglish = district.GetProperty("full_name_en").GetString(),
                                    Latitude = ConvertStringToDouble(district.GetProperty("latitude").GetString()),
                                    Longitude = ConvertStringToDouble(district.GetProperty("longitude").GetString()),
                                    ProvinceId = newProvince.Id
                                };
                                context.Districts.Add(newDistrict);
                                context.SaveChanges();
                                var wardArray = district.GetProperty("data3");
                                foreach (var ward in wardArray.EnumerateArray())
                                {
                                    var newWard = new Ward
                                    {
                                        Name = ward.GetProperty("name").GetString(),
                                        NameEnglish = ward.GetProperty("name_en").GetString(),
                                        FullName = ward.GetProperty("full_name").GetString(),
                                        FullNameEnglish = ward.GetProperty("full_name_en").GetString(),
                                        Latitude = ConvertStringToDouble(ward.GetProperty("latitude").GetString()),
                                        Longitude = ConvertStringToDouble(ward.GetProperty("longitude").GetString()),
                                        DistrictId = newDistrict.Id
                                    };
                                    context.Wards.Add(newWard);
                                    context.SaveChanges();
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
