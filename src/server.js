// Install the following npm modules
// npm install --save express@4.17.1
// npm install --save path@0.12.7
// npm install --save hbs@4.1.1
// npm install --save body-parser@1.19.0
// @See https://www.expressjs.com for more details

// npm run start
// npm uninstall -g nodemon
// npm install nodemon --save-dev
// npm run dev

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');

// Define paths for express engine
const publicHTMLPath = path.join(__dirname, "../public");
const dynamicViewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const portHTTP = process.env.PORT || 3000;

const router = express.Router();
const app = express();

// The handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', dynamicViewPath);
hbs.registerPartials(partialsPath);

// The static directory to serve
app.use(express.static(publicHTMLPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



router.get('/', (req,res) => {
    res.render('index' , {
        page_title: 'Personal Password Wallet',
        title: 'Personal Wallet Web page',
        name: 'Chamindra Dushan'
    });
});

// about us - static html
//app.get('/about', (req,res) => {
//    res.sendFile('aboutus.html',{root: publicHTMLPath});
//    //res.send("This will be printed as HTML context");
//});

// about us - dynamic view
router.get('/about', (req,res) => {
    res.render('about', {
        page_title : 'Personal Password Wallet',
        title: 'About Me',
        name: 'Chamindra Dushan'
    })
});

// about us - dynamic view
router.get('/login', (req,res) => {
    if(!req.query.username) {
        return res.render('login', {
            page_title : 'Personal Password Wallet',
            title: 'Test Login Form',
            name: 'Chamindra Dushan'
        })
    }
    console.log("User entered Username: ",req.query.username);
    return res.send("You are logged in successfully!. And your username is "+req.query.username);

});

router.post('/login',(req, res) => {
  var user_name=req.body.user;
  var password=req.body.password;
  console.log("User name = "+user_name+", password is "+password);
  if(user_name==='admin' && password==='123456')
    res.end("yes");
  else
    res.end("no");
});


// all the mappings except the above url mappings would map to the wildcard mapping below;
router.get('*', (req,res) => {
    res.render('404' , {
        name: 'Chamindra Dushan'
    });
});

// add router in the Express app.
app.use("/", router);

app.listen(portHTTP, () => {
    console.log("---------------------------------------------");
    console.log("The Web Server has been started successfully!");
    console.log("Server HTTP Port: ",portHTTP);
    console.log("Public HTML Path", path.join(__dirname, "../public"));
})