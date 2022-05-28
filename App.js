const Express=require("express")
const Bodyparser=require("body-parser")
const Mongoose=require("mongoose")

var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
    next(); });

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
    data={"name":getName,"date":getDate,"venue":getVenue,"organiser":getOrganiser,"contact":getContact}
    let myevent=new eventModel(data)
    myevent.save((error,data)=>{
        if(error){
            res.send({"status":"error","data":error})
        }
        else{
            res.send({"status":"success","data":data})
        }
    })
})

app.get("/api/eventview",(req,res)=>{
    eventModel.find(
        (error,data)=>{
            if(error)
            {
                res.send({"status":"error"})
            }
            else
            {
                res.send(data)
            }
        }
    )
})

app.post("/api/search",(req,res)=>{
    var getDate=req.body
    eventModel.find(getDate,(error,data)=>{
        if(error)
        {
            res.send({"status":"error"})
        }
        else
        {
            res.send(data)
        }
    })
})

app.post("/api/delete",(req,res)=>{
    var getId=req.body
    eventModel.findByIdAndRemove(getId,(error,data)=>{
        if(error)
        {
res.send({"status":"error"})
        }
        else
        {
res.send({"status":"success"})
        }
    })
})

app.listen(4007,()=>{
    console.log("server running")
})