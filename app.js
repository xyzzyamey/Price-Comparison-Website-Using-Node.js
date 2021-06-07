const express=require("express");
const app=express();
const http=require('http');
const path=require('path');
const axios=require('axios');
const request=require('request');
const cherio=require('cherio');
app.use(express.urlencoded());
app.use(express.json());
const port=80;
const fs=require('fs');
const cheerio = require("cherio/lib/cheerio");
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/',async function(req,res){
    let data={flipkart: [],
        amazon: [],
        vijay: [],
        snapdeal: [],
        patym: [],
        gadget: [],
        links: ["","","","","",""]};

    res.render('index.ejs',data);
    res.end(console.log("done"))

})

app.post('/',async function(req, res){
    var flp=true;
    var amz=true;
    var vij=true;
    var snp=true;
    var pat=true;
    var gad=true;
    const sleep=(milliseconds)=>{
        return new Promise(resolve=>setTimeout(resolve,milliseconds))
    }
    var links=[]

    search=req.body.searchtext;
   
    search=search.replace(" ","%20");

    var flp_res=[];
    flp_str1="https://www.flipkart.com/search?q=";
    flp_str2="&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off&as-pos=1&as-type=HISTORY";
    flp_query=flp_str1+search+flp_str2;
    links.push(flp_query);
    request(flp_query, function (err, response, html) {

        let $ = cheerio.load(html);

        let item = [];
        $("div ._4rR01T").each(function (i, el) {
            item.push($(el).text());
        });

        let price = [];
        $("div ._30jeq3._1_WHN1").each(function (i, el) {
            price.push($(el).text());
        });
        for (i = 0; i < 5; i++) {
            flp_res.push({ item: item[i], price: price[i] });
        }
        flp=false;
        //console.log(flp_res);
    })


    var amz_res=[];
    amz_str1="https://www.amazon.in/s?k=";
    amz_str2="&ref=nb_sb_noss_2";
    amz_query=amz_str1+search+amz_str2;
    links.push(amz_query);
    request(amz_query, function (err, response, html) {

        let $ = cheerio.load(html);

        let item = [];
        $("span .a-size-medium.a-color-base.a-text-normal").each(function (i, el) {
            item.push($(el).text());
        });

        let price = [];
        $("span .a-price-whole").each(function (i, el) {
            price.push($(el).text());
        });
        for (i = 0; i < 5; i++) {
            amz_res.push({ item: item[i], price: price[i] });
        }
        amz=false;
        // console.log(amz_res);
    })
    

    var vijay_res=[];
    snap_str1="https://www.vijaysales.com/search/";
    snap_str2="";
    snap_query=snap_str1+search+snap_str2;
    links.push(snap_query);
    request(snap_query, function (err, response, html) {

        let $ = cheerio.load(html);

        let item = [];
        $("h2.Dynamic-Bucket-ProductName").each(function (i, el) {
            item.push($(el).text().trim());
        });

        let price = [];
        $("div .Dynamic-Bucket-vsp").each(function (i, el) {
            price.push($(el).text());
        });
        for (i = 0; i < 5; i++) {
            vijay_res.push({ item: item[i], price: price[i] });
        }
        vij=false;
        // console.log(vijay_res);
    })



    var snap_res=[]
    snap_str3="https://www.snapdeal.com/search?keyword=";
    snap_str4="&santizedKeyword=samsung&catId=0&categoryId=0&suggested=true&vertical=p&noOfResults=20&searchState=&clickSrc=suggested&lastKeyword=&prodCatId=&changeBackToAll=false&foundInAll=false&categoryIdSearched=&cityPageUrl=&categoryUrl=&url=&utmContent=&dealDetail=&sort=rlvncy";
    snap_query2=snap_str3+search+snap_str4;
    links.push(snap_query2);
   
    request(snap_query2, function (err, response, html) {

        let $ = cheerio.load(html);

        let item = [];
        $("p.product-title").each(function (i, el) {
            item.push($(el).text());
        });

        let price = [];
        $("span.lfloat.product-price").each(function (i, el) {
            price.push($(el).text());
        });
        for (i = 0; i < 5; i++) {
            snap_res.push({ item: item[i], price: price[i] });
        }
        snp=false;

        // console.log(snap_res);
    })

    var patym_res=[]
    shop_str1="https://paytmmall.com/shop/search?q=";
    shop_str2="&from=organic&child_site_id=6&site_id=2";
    shop_query=shop_str1+search+shop_str2;
    links.push(shop_query);
    request(shop_query, function (err, response, html) {

        let $ = cheerio.load(html);

        let item = [];
        $("div .UGUy").each(function (i, el) {
            item.push($(el).text());
        });

        let price = [];
        $("div ._1kMS").each(function (i, el) {
            price.push($(el).text());
        });
        for (i = 0; i < 5; i++) {
            patym_res.push({ item: item[i], price: price[i] });
        }
        pat=false;
        // console.log(patym_res);
    })
    
    
    var gadget_res=[]
    gadget1="https://shop.gadgetsnow.com/mtkeywordsearch?SEARCH_STRING=";
    gadget2="";
    gadget_query=gadget1+search+gadget2;
    links.push(gadget_query);
   
    request(gadget_query, function (err, response, html) {

        let $ = cheerio.load(html);

        let item = [];
        $("span.product-name").each(function (i, el) {
            item.push($(el).text().trim());
        });

        let price = [];
        $("span.offerprice").each(function (i, el) {
            price.push($(el).text().trim());
        });
        for (i = 0; i < 5; i++) {
            gadget_res.push({ item: item[i], price: price[i] });
        }
        gad=false;
        // console.log(gadget_res);
    })


   const doSomething= async()=>{
       await sleep(3200);

       var data={flipkart: flp_res,
       amazon: amz_res,
       vijay: vijay_res,
       snapdeal: snap_res,
       patym: patym_res,
       gadget: gadget_res,
       links: links};
   
       res.render('index.ejs', data);
   }

   doSomething();

    // console.log(flp_res);
    // console.log(amz_res);
    // console.log(vijay_res);
    // console.log(snap_res);
    // console.log(patym_res);
    // console.log(gadget_res);
    


    // var data={flipkart: flp_res,
    // amazon: amz_res,
    // vijay: vijay_res,
    // snapdeal: snap_res,
    // patym: patym_res,
    // gadget: gadget_res};

    // res.render('index.ejs', data);


})


app.listen(port, ()=>{
    console.log(`Application started on port: ${port}`);
});
