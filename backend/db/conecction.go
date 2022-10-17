package db

import (
    "log"
    "os"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"

    "github.com/pame17/Arqui-Disp/models"
)
var DB *gorm.DB
var DSN = "host="+os.Getenv("DB_HOST")+" user="+os.Getenv("DB_USERNAME")+" password="+os.Getenv("DB_PASSWORD")+" dbname="+os.Getenv("DB_DATABASE")+" port="+os.Getenv("DB_PORT")+""

func StartConnection(){
    var err error
    DB, err = gorm.Open(postgres.Open(DSN), &gorm.Config{})
    if err != nil {
      log.Fatal(err)
      return
    }
    log.Println("Database connection successful")

}
func CloseConnection(){
    sqlDB, err := DB.DB()
    if err != nil{
      log.Fatal(err)
      return
    }
    sqlDB.Close()
    log.Println("Database connection ended")
}
func InitDB(){
    StartConnection()
    DB.Migrator().DropTable(models.User{}, models.Review{}, models.Movie{}, models.Claims{})
    DB.AutoMigrate(models.User{}, models.Review{}, models.Movie{})

    user1:= models.User{Username: "pame", Password: "1234"}
    user1.HashPassword(user1.Password)
    user2:= models.User{Username: "pope", Password: "123"}
    user2.HashPassword(user2.Password)
    movie1 := models.Movie{
      Title: "Battle: Los Angeles",
      Description: "When once distant UFOs become a terrifying threat attacking Earth, a Marine staff sergeant and his team take it upon themselves to face the enemy and protect what remains of the planet.",
      Poster: "https://image.tmdb.org/t/p/w500//jloyGeVYZSxM9zsLFvVOWuj2ey4.jpg"}
    movie2 := models.Movie{
      Title: "Alita: Battle Angel",
      Description: "When Alita awakens with no memory of who she is in a future world she does not recognize, she is taken in by Ido, a compassionate doctor who realizes that somewhere in this abandoned cyborg shell is the heart and soul of a young woman with an extraordinary past.",
      Poster: "https://image.tmdb.org/t/p/w500//xRWht48C2V8XNfzvPehyClOvDni.jpg"}
    movie3 := models.Movie{
      Title: "Batman and Superman: Battle of the Super Sons",
      Description: "After discovering he has powers, 11-year-old Jonathan Kent and assassin-turned-Boy-Wonder Damian Wayne must join forces to rescue their fathers (Superman & Batman) and save the planet from the malevolent alien force known as Starro.",
      Poster: "https://image.tmdb.org/t/p/w500//nBaVsNvUxIuvhPw3xTaAJIw8me4.jpg"}
    movie4 := models.Movie{
      Title: "Battle: Freestyle",
      Description: "Amalie and Mikael lead their street dance team to the finals in France but tough competition and personal distractions threaten to ruin their dreams.",
      Poster: "https://image.tmdb.org/t/p/w500//6D6QumiHEhnpZG12Ibjy2BxA6n4.jpg"}
    movie5 := models.Movie{
      Title: "The Hobbit: The Battle of the Five Armies",
      Description: "Immediately after the events of The Desolation of Smaug, Bilbo and the dwarves try to defend Erebor's mountain of treasure from others who claim it: the men of the ruined Laketown and the elves of Mirkwood. Meanwhile an army of Orcs led by Azog the Defiler is marching on Erebor, fueled by the rise of the dark lord Sauron. Dwarves, elves and men must unite, and the hope for Middle-Earth falls into Bilbo's hands.",
      Poster: "https://image.tmdb.org/t/p/w500//xT98tLqatZPQApyRmlPL12LtiWp.jpg"}
    movie6 := models.Movie{
      Title: "Mortal Kombat Legends: Battle of the Realms",
      Description: "The Earthrealm heroes must journey to the Outworld and fight for the survival of their homeland, invaded by the forces of evil warlord Shao Kahn, in the tournament to end all tournaments: the final Mortal Kombat.",
      Poster: "https://image.tmdb.org/t/p/w500//ablrE8IbWcIrAxMmm4gnPn75AMS.jpg"}
    movie7 := models.Movie{
      Title: "Battle",
      Description: "Amalie is the girl who has everything, good looks, money, a boyfriend and a big talent of dancing. One day, her world falls apart and she moves from everything she knows. Then enter Mikael. He is dancing in the streets and Amalie joins him in dancing on the streets, dancing Battles.",
      Poster: "https://image.tmdb.org/t/p/w500//zfGhtAX7xe7W0ZgEcM2n6tnxgc0.jpg"}
    movie8 := models.Movie{
      Title: "Dragonheart: Battle for the Heartfire",
      Description: "When the King Gareth dies, his potential heirs, twin grandchildren who possess the dragon’s unique strengths, use their inherited powers against each other to vie for the throne. When Drago’s source of power – known as the Heartfire – is stolen, more than the throne is at stake; the siblings must end their rivalry with swords and sorcery or the kingdom may fall.",
      Poster: "https://image.tmdb.org/t/p/w500//nPjqwumVHyx2nOCyZH5dpXAmhpf.jpg"}
    movie9 := models.Movie{
      Title: "Night at the Museum: Battle of the Smithsonian",
      Description: "Hapless museum night watchman Larry Daley must help his living, breathing exhibit friends out of a pickle now that they've been transferred to the archives at the Smithsonian Institution. Larry's (mis)adventures this time include close encounters with Amelia Earhart, Abe Lincoln and Ivan the Terrible.",
      Poster: "https://image.tmdb.org/t/p/w500//dNvYjzFuSSY7DCVZK7zzaZFemHt.jpg"}



    review1:= models.Review{
      Description: "Integer a risus rutrum dui lobortis laoreet sed sed ex.",
      Puntaje: 3, IdMovie: 1, Username: "pame"}
    review2:= models.Review{
      Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae odio luctus, pulvinar ex id, rhoncus lacus. Nunc ornare pulvinar.",
      Puntaje: 5, IdMovie: 1, Username: "pope"}
    review3:= models.Review{
      Description: "Suspendisse quis risus interdum, gravida.",
      Puntaje: 2, IdMovie: 2, Username: "pope"}

    DB.Create(&user1)
    DB.Create(&user2)
    DB.Create(&movie1)
    DB.Create(&movie2)
    DB.Create(&movie3)
    DB.Create(&movie4)
    DB.Create(&movie5)
    DB.Create(&movie6)
    DB.Create(&movie7)
    DB.Create(&movie8)
    DB.Create(&movie9)
    DB.Create(&review1)
    DB.Create(&review2)
    DB.Create(&review3)

    CloseConnection()
}