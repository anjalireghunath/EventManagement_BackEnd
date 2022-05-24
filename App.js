const Express=require("express")
const Bodyparser=require("body-parser")
const Mongoose=require("mongoose")

var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())

var eventModel=Mongoose.model("event",
new Mongoose.Schema(
    {
        name:String,
        date:String,
        venue:String,
        organiser:String,
        contact:String

    }
)
)

Mongoose.connect("mongodb+srv://anjalireghunath:9846434831@cluster0.ursz9.mongodb.net/EventDB")


app.post("/api/eventadd",(req,res)=>{
    var getName=req.body.name
    var getDate=req.body.date
    var getVenue=req.body.venue
    var getOrganiser=req.body.organiser
    var getContact=req.body.contact
    datas={"name":getName,"date":getDate,"venue":getVenue,"organiser":getOrganiser,"contact":getContact}
    let myevent=new eventModel(datas)
    myevent.save((error,datas)=>{
        if(error){
            res.send({"status":"error","datas":error})
        }
        else{
            res.send({"status":"success","datas":datas})
        }
    })
})

app.post("/api/eventview",(req,res)=>{
    res.send("hai")
})

app.listen(4007,()=>{
    console.log("server running")
})