using Microsoft.EntityFrameworkCore;

namespace UltraBusAPI.Datas
{
    public class MyDBContext : DbContext
    {
        public MyDBContext(DbContextOptions<MyDBContext> options) : base(options)
        {
        }

        #region DbSet
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<RolePermission> RolePermissions { get; set; }
        public DbSet<Province> Provinces { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<Ward> Wards { get; set; }
        public DbSet<Bus> Buses { get; set; }
        public DbSet<BusRoute> BusRoutes { get; set; }
        public DbSet<BusStation> BusStations { get; set; }
        public DbSet<BusRouteTrip> BusRouteTrips { get; set; }
        public DbSet<BusRouteStation> BusRouteStations { get; set; }
        public DbSet<BusRouteTripDate> BusRouteTripDates { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<OTP> OTPs { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //User - Role(One - to - Many)
            modelBuilder.Entity<User>()
                .HasOne(u => u.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.RoleId);

            //RolePermissions(Many - to - Many)
            modelBuilder.Entity<RolePermission>()
                .HasKey(rp => new { rp.RoleId, rp.PermissionId });

            modelBuilder.Entity<RolePermission>()
                .HasOne(rp => rp.Role)
                .WithMany(r => r.RolePermissions)
                .HasForeignKey(rp => rp.RoleId);

            modelBuilder.Entity<RolePermission>()
                .HasOne(rp => rp.Permission)
                .WithMany(p => p.RolePermissions)
                .HasForeignKey(rp => rp.PermissionId);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Ward)
                .WithMany(w => w.Users)
                .HasForeignKey(u => u.WardId);

            modelBuilder.Entity<User>()
                .HasOne(u => u.District)
                .WithMany(d => d.Users)
                .HasForeignKey(u => u.DistrictId);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Province)
                .WithMany(p => p.Users)
                .HasForeignKey(u => u.ProvinceId);

            modelBuilder.Entity<Ward>()
                .HasOne(w => w.District)
                .WithMany(d => d.Wards)
                .HasForeignKey(w => w.DistrictId);

            modelBuilder.Entity<District>()
                .HasOne(d => d.Province)
                .WithMany(p => p.Districts)
                .HasForeignKey(d => d.ProvinceId);

            modelBuilder.Entity<BusRoute>()
                .HasOne(br => br.StartStation)
                .WithMany(bs => bs.StartBusRoutes)
                .HasForeignKey(br => br.StartStationId);

            modelBuilder.Entity<BusRoute>()
                .HasOne(br => br.EndStation)
                .WithMany(bs => bs.EndBusRoutes)
                .HasForeignKey(br => br.EndStationId);

            modelBuilder.Entity<BusRouteTrip>()
                .HasOne(brt => brt.BusRoute)
                .WithMany(br => br.BusRouteTrips)
                .HasForeignKey(brt => brt.BusRouteId);

            modelBuilder.Entity<BusRouteStation>()
                .HasKey(brs => new { brs.BusRouteId, brs.BusStationId });
            modelBuilder.Entity<BusRoute>()
                .HasMany(br => br.BusRouteStations)
                .WithOne(brs => brs.BusRoute)
                .HasForeignKey(brs => brs.BusRouteId);
            modelBuilder.Entity<BusRouteStation>()
                .HasOne(brs => brs.BusStation)
                .WithMany(bs => bs.BusRouteStations)
                .HasForeignKey(brs => brs.BusStationId);

            modelBuilder.Entity<BusRouteTripDate>()
                .HasOne(brtd => brtd.BusRouteTrip)
                .WithMany(brt => brt.BusRouteTripDates)
                .HasForeignKey(brtd => brtd.BusRouteTripId);
            modelBuilder.Entity<BusRouteTripDate>()
                .HasOne(brtd => brtd.StartStation)
                .WithMany(bs => bs.StartBusRouteTripDates)
                .HasForeignKey(brtd => brtd.StartStationId);
            modelBuilder.Entity<BusRouteTripDate>()
                .HasOne(brtd => brtd.EndStation)
                .WithMany(bs => bs.EndBusRouteTripDates)
                .HasForeignKey(brtd => brtd.EndStationId);

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.BusRouteTripDate)
                .WithMany(brtd => brtd.Tickets)
                .HasForeignKey(t => t.BusRouteTripDateId);
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.User)
                .WithMany(u => u.Tickets)
                .HasForeignKey(t => t.UserId);
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.BusStationUp)
                .WithMany(bs => bs.TicketsUp)
                .HasForeignKey(t => t.BusStationUpId);
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.BusStationDown)
                .WithMany(bs => bs.TicketsDown)
                .HasForeignKey(t => t.BusStationDownId);

        }
    }
}
