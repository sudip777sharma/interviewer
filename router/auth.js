const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate')
const puppeteer = require('puppeteer');

const { PythonShell } = require('python-shell');

require('../db/conn')
const User = require('../model/userSchema')

// fetch the qa init
const mongoose = require('mongoose');
const qaSchema = new mongoose.Schema({
    qaType: {
        type: String,
        required: true
    },
    qaData: {
        type: Object,
        required: true
    }
})
const qadbc = mongoose.model('qa', qaSchema);

// home
// router.get('/', (req, res) => {
//     res.send(`hello from the home by router js`);
// });


// practice
router.post('/practice', async(req, res) => {
    try {
        const { qaSource } = req.body;
        if (qaSource === 'webScrape') {
            const browser = await puppeteer.launch({
                headless: true
            });
            const page = await browser.newPage();
            await page.goto('https://www.interviewbit.com/technical-interview-questions/');

            const topics = await page.evaluate(() => {
                let res = document.querySelector("#programming-language-tools-technologies").querySelectorAll("a")
                res = [...res];
                let ans = [];
                res.map(ele => {
                    ans.push({
                        topicName: ele.innerText,
                        topicLink: ele.href
                    });
                });
                return ans;
            });
            // console.log(topics);
            const companies = await page.evaluate(() => {
                var res = document.getElementById('company');
                res = res.children[2].children[1];
                res = res.querySelectorAll('a');
                res = [...res];
                let ans = [];
                res.map(ele => {
                    ans.push({
                        companyName: ele.innerText,
                        companyLink: ele.href
                    });
                });
                return ans;
            });
            await browser.close();
            // console.log(companies);
            const data = { topics: topics, companies: companies };
            console.log(data);
            if (data) {
                return res.status(200).json(data);
            } else {
                return res.status(422).json({ error: "did not got the data." });
            }
        } else if (qaSource === 'dataBase') {
            const qa = await qadbc.find();
            console.log('qa: ', qa);
            const topics = [];
            qa.forEach((ele) => {
                topics.push({ topicName: ele.qaType });
            })
            return res.status(200).json({ topics: topics });
        }
    } catch (err) {
        console.log(err);
    }
})


// instruction route
router.post('/instruction', async(req, res) => {
    try {
        const { qaType } = req.body;
        if (!qaType) {
            return res.status(400).json({ error: "type not recived." })
        }
        const qa = await qadbc.findOne({ qaType: qaType });
        if (qa) {
            // return res.status(200).json({ message: "fetched the data structure qa." });
            return res.status(200).json({ qa: qa });
        } else {
            return res.status(422).json({ error: "did not find the type of qa you have requested." });
        }
    } catch (err) {
        console.log(err);
    }
})

// registeration route
// using async await
router.post('/register', async(req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;
    // console.log(name);
    // console.log(email);
    // res.json({ message: req.body });
    // res.send('my register page');
    console.log("---auth.js------------------------------------");
    console.log("sudeep => ", req.body)
    console.log("------------------------------------auth.js---");
    if (!name || !email || !phone || !work || !password || !cpassword) {
        console.log("---auth.js------------------------------------");
        console.log("sudeep => please fill all the text field");
        console.log("------------------------------------auth.js---");
        return res.status(422).json({ error: "please fill all the text field" });
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            console.log("---auth.js------------------------------------");
            console.log("email already exists");
            console.log("------------------------------------auth.js---");
            return res.status(422).json({ error: "email already exists" });
        } else if (password !== cpassword) {
            console.log("---auth.js------------------------------------");
            console.log("password are not matching");
            console.log("------------------------------------auth.js---");
            return res.status(422).json({ error: "password are not matching" });
        } else {
            // const user = new user(req.body);
            const overallScore = 0;
            const bestScore = 0;
            const user = new User({ name, email, phone, work, password, cpassword, overallScore, bestScore });
            // hashing of the password
            const userRegister = await user.save();
            console.log("---auth.js------------------------------------");
            console.log("user registered successfully");
            console.log("------------------------------------auth.js---");
            res.status(201).json({ message: "user registered successfully" });
        }

    } catch (err) {
        console.log("---auth.js------------------------------------");
        console.log("------------------------------------auth.js---");
        console.log(err);
    }

});

// result
router.post('/result', async(req, res) => {
    try {
        // const { qResult, aResult, aExpResult, userId, overallScore, bestScore } = req.body;
        const { userId, overallScore, bestScore, avgScore } = req.body;

        console.log("avgScore: ", avgScore);
        console.log("overallScore: ", overallScore);
        console.log("bestScore: ", bestScore);
        const maxScore = Math.max(bestScore, avgScore);
        const ScoreRes = Math.floor((parseInt(overallScore) + parseInt(avgScore)) / 2);
        User.updateOne({ "_id": userId }, { "overallScore": ScoreRes, "bestScore": maxScore }, (err, res) => {
            if (err) throw err;
            console.log("document updated", res);
        });

        return res.status(200).json({ "message": "successfully updated the score" });

        // console.log('req.body: ', req.body);
        // console.log('qResult: ', qResult);
        // console.log('typeof(qResult): ', typeof(qResult));
        // console.log('aResult: ', aResult);

        // machine learning compute result
        // const obj = JSON.stringify({
        //     qResult,
        //     aResult,
        //     aExpResult
        // })
        // let score = [];
        // let avgScore = 0;
        // const res = await fetch('https://interview-score-api.vercel.app/computeScoreApi', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         qResult: aExpResult,
        //         aResult: aResult
        //     })
        // });

        // return res.status(200).json(res);
        // let options = {
        //     mode: 'text',
        //     // pythonOptions: ['-u'],
        //     // scriptPath: 'E:\\code_base\\mern\\MyInterViewer\\server\\router',
        //     scriptPath: './router',
        //     args: [obj]
        // }
        // PythonShell.run('InterviewerAI.py', options, function(err, results) {
        //     if (err) {
        //         console.log('error took place : ', err);
        //     } else {
        //         console.log('results: ', results);
        //         console.log('typeof(results): ', typeof(results));
        //         if (results) {
        //             console.log('results[1]: ', results[0]);
        //             console.log('results[2]: ', results[1]);
        //             score = results[0]
        //             avgScore = results[1]
        //             avgScore = JSON.parse(avgScore);
        //             score = JSON.parse(score);
        //             console.log('result[0] score: ', score);
        //             console.log('typeof(score): ', typeof(score))
        //             console.log('result[1] avgScore: ', avgScore);
        //             console.log('typeof(avgScore): ', typeof(avgScore));
        //             console.log('AI script finished');

        //             console.log('overallScore: ', overallScore);
        //             const maxScore = Math.max(bestScore, avgScore);
        //             const overallScoreRes = Math.floor((parseInt(overallScore) + parseInt(avgScore)) / 2);
        //             User.updateOne({ "_id": userId }, { "overallScore": overallScoreRes, "bestScore": maxScore }, (err, res) => {
        //                 if (err) throw err;
        //                 console.log("document updated", res);
        //             });

        //             return res.status(200).json({ score, avgScore });
        //         } else {
        //             return res.status(200).json({ score, avgScore });
        //         }
        //     }
        // })
    } catch (err) {
        console.error(err);
        return res.status(400).json({ error: "some error" });
    }
})


// login route
router.post('/signin', async(req, res) => {
    // console.log(req.body);
    // res.json({ message: "Awesome" });

    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "please fill the data" });
        }

        const userLogin = await User.findOne({ email: email });
        console.log("---auth.js------------------------------------");
        console.log(userLogin);
        console.log("------------------------------------auth.js---");

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            token = await userLogin.generateAuthToken();
            console.log("---auth.js------------------------------------");
            console.log(token);
            console.log("------------------------------------auth.js---");

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            res.cookie("user_id", userLogin.id, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({ error: "Invalid credential" });
            } else {
                res.status(200).json({ message: "user signedin successfully" });
            }
        } else {

            res.status(400).json({ error: "Invalid credential" });
        }

    } catch (err) {
        console.log("---auth.js------------------------------------");
        console.log(err);
        console.log("------------------------------------auth.js---");
    }

})

// about route
router.get('/about', authenticate, (req, res) => {
    console.log("---auth.js------------------------------------");
    console.log("this is about page")
    console.log("------------------------------------auth.js---");
    res.send(req.rootUser);
});

// logout route
router.get('/logout', (req, res) => {
    console.log("---auth.js------------------------------------");
    console.log("this is logout page")
    console.log("------------------------------------auth.js---");
    res.clearCookie('user_id', { path: '/' });
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('user logout successfully');
});


module.exports = router;