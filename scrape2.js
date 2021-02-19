var axios = require('axios');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "aaaaa",
  database: "scraping_abb"
});


var config = {
    method: 'get',
    url: 'https://www.airbnb.com/api/v3/PdpReviews?operationName=PdpReviews&locale=en&currency=USD&variables=%7B%22request%22%3A%7B%22fieldSelector%22%3A%22for_p3%22%2C%22limit%22%3A7%2C%22listingId%22%3A%22530250%22%2C%22numberOfAdults%22%3A%221%22%2C%22numberOfChildren%22%3A%220%22%2C%22numberOfInfants%22%3A%220%22%2C%22offset%22%3A%227%22%7D%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22a6ecae1e52d14869af66a3a1214bb44397c6f8788e308bea63a503fd32000fc4%22%7D%7D&_cb=1xkpiqy1k5sz6t',
    headers: { 
      'authority': 'www.airbnb.com', 
      'device-memory': '8', 
      'x-airbnb-graphql-platform-client': 'minimalist-niobe', 
      'x-csrf-token': 'V4$.airbnb.com$P1mOe_p5vFw$OfXF0Kn9pInh-JrpqadHwlgqVinGjZAKZAgOM96sczo=', 
      'x-airbnb-api-key': 'd306zoyjsyarp7ifhu67rjxn52tv0t20', 
      'x-csrf-without-token': '1', 
      'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Mobile Safari/537.36', 
      'viewport-width': '591', 
      'content-type': 'application/json', 
      'accept': '*/*', 
      'dpr': '2', 
      'ect': '4g', 
      'x-airbnb-graphql-platform': 'web', 
      'sec-fetch-site': 'same-origin', 
      'sec-fetch-mode': 'cors', 
      'sec-fetch-dest': 'empty', 
      'referer': 'https://www.airbnb.com/rooms/530250/reviews?source_impression_id=p3_1605063003_gUbib6mH0AtLYOBy', 
      'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8', 
      'cookie': 'cdn_exp_f699727e78669251b=treatment; bev=1602075107_zedtU9bM5yxzmIqf; tzo=480; _ga=GA1.2.664251120.1602075591; __ssid=4f0753278fe5d640cc04c85433990f0; _gcl_au=1.1.1068787607.1602162314; affiliates_bev=1602162317_5mqlE46marK6a%2Bwk; cdn_exp_b76569944fd3a6caf=extend_one_three_five_days; cdn_exp_e437bcda7f41486a6=control; 016951b48=treatment; sdid=; cdn_exp_14332663b5ca816ee=control; cdn_exp_b1b38777d5c7a308a=runtime_initializers; cdn_exp_283a19eb11edcad71=control; cdn_exp_140d70271b981c913=treatment; fbm_138566025676=base_domain=.airbnb.com; _pt=1--WyJkYTFjZTYwMDI2OTI5YTA5NTU1YTgxMzc0ZmEwMTdmNWZmOTVlMTViIl0%3D--5063e1d0dc13cc4846376fbbfc882c7565983f06; _aat=0%7CArlLo%2BwINEtkKssS%2F9rgGvdsS8B4JUKDFHvV7CnsVRajxbGB30q1xIkb97dbcST9; _airbed_session_id=df87a683904cfec08bb449700f7ceb47; hli=1; cdn_exp_24332663b5ca816ee=treatment; _csrf_token=V4%24.airbnb.com%24P1mOe_p5vFw%24OfXF0Kn9pInh-JrpqadHwlgqVinGjZAKZAgOM96sczo%3D; flags=0; roles=0; country=ID; cdn_exp_ccb7b37b3b52596ae=control; cdn_exp_34332663b5ca816ee=treatment; _uetvid=e83e2f10096611ebb13dc96142e2b37f; cdn_exp_da1663c66e2988797=treatment_2; __svt=613; fbsr_138566025676=YtBCz707IzDOiPrtltV1OhQatpxzCHDL7qwDPL8xiaM.eyJ1c2VyX2lkIjoiMjU2NTEzNzY3MDM3MTg2OCIsImNvZGUiOiJBUUFZcm5RUWFlLXNTSU15Q0JuZjhvdk9paE1IdlNfeXFETHVfSjBJNTRKUkRxUlBiRjJUdkxNaEp0eDNjTXBJVGhJOVpJSkVqR0JQRGhWdWJOckl4U1kzY0NOX3JRdG1mUXZDZWFXLW03VExjTmpKc1prbFZFekRiNTgzZEIzMDdZaDlPdGpaM0tWdmdhdTE3S1dkNFpra2FidV8xUXM1WjBWblVZV2o5QmFOeFRNOVZvdmNVUEZtMlJWd2ZkTjBUaGh2OU1VNVFyWl9Zd0JyWnZSNjk1dFBFcGVyRHBGeHE3cHlWeV8xWUhkX1RJOERxZ0dBVXlIc0NUTmJfUjQ2Q1F0UDhWZlJvVXV3d1hEMC1xS0QzWnFZR3VRa1VlSWFCakQ0eDJEQmlDX3FDSVJqY1RJX2std0luaUt1bFJZbXY4N1p5c1FNaEVqTV9pYzFyN3J3eWVETiIsIm9hdXRoX3Rva2VuIjoiRUFBQUFJRU10d2N3QkFKVVpDRmJKNzQ4TlFKeFVHNVVyeTFQdkQ0d0FaQWRVWkN1a051TzVTWkN0Y08yb1F4dTJyMEYxTDFxOVlQbEpzajJnaHZHeDM2QVFkWkNJdnh5REVtTW1QR0tZR3Z4WW93aDhFSWFwME9HanJkTFpCV2dReGoxODZqYVNtNnBBSnAySFlaQ3JhWkNrb2xsdUdrRkxJbk9CNzdGZzhtdldkbndMUTlwWkF4bzFVIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE2MDQ4MDM2OTd9; _gid=GA1.2.460785301.1604962583; cdn_exp_9195a6ae021b7ec32=control; cdn_exp_2308778226e12d44f=control; jitney_client_session_id=72593219-9369-42ef-8833-3ea8ad1db41f; jitney_client_session_created_at=1605062217; AMP_TOKEN=%24NOT_FOUND; ak_bmsc=B3F90EE4C9E158860215ACC89E8CAB93172C04AFFE0A00005C57AB5F565C2960~pl0Ky4zsbhUQtKFpcNuOV76ojRcvGw/cJz8B2eUfjsvN7HeheD5WocfHQQdwHrmYn/lja6p/UN9E0vQ6pdBENldfJMcxgPYvyRxSq7v8W3Fkqp0/O4W0mDsdlsiZFBJbHeF+J7gDUGi8lFEVfzguN2fvsv5lSCRPDBzUx+63lju51htPq6qRq2i7KzGG80Grxd+ITG/QXjn/KEmEPXUJA0C3EU03B5M7LcSTI/QtDd7qU=; _user_attributes=%7B%22curr%22%3A%22USD%22%2C%22guest_exchange%22%3A1.0%2C%22device_profiling_session_id%22%3A%221602075107--44aa683dc6ad2be7b9b4cf38%22%2C%22giftcard_profiling_session_id%22%3A%221605063002-373561665-dd2f5d3a0bae0e3d376a5bd4%22%2C%22reservation_profiling_session_id%22%3A%221605063002-373561665-e8794450f849c11130cf7548%22%2C%22id%22%3A373561665%2C%22hash_user_id%22%3A%22da1ce60026929a09555a81374fa017f5ff95e15b%22%2C%22eid%22%3A%228Hb2HZmu5BwR8XwsSNCsRw%3D%3D%22%2C%22num_msg%22%3A0%2C%22num_notif%22%3A%222%22%2C%22num_alert%22%3A3%2C%22num_h%22%3A0%2C%22num_trip_notif%22%3A0%2C%22name%22%3A%22Fira%22%2C%22num_action%22%3A0%2C%22is_admin%22%3Afalse%2C%22can_access_photography%22%3Afalse%2C%22travel_credit_status%22%3Anull%2C%22referrals_info%22%3A%7B%22receiver_max_savings%22%3Anull%2C%22receiver_savings_percent%22%3Anull%2C%22receiver_signup%22%3Anull%2C%22referrer_guest%22%3A%22%2416%22%2C%22terms_and_conditions_link%22%3A%22%2Fhelp%2Farticle%2F2269%22%2C%22wechat_link%22%3Anull%2C%22offer_discount_type%22%3Anull%7D%7D; cache_state=0; previousTab=%7B%22id%22%3A%22bb2db152-8771-4b7b-a93f-03fdc5849241%22%2C%22url%22%3A%22https%3A%2F%2Fwww.airbnb.com%2Frooms%2F530250%2Freviews%3Fsource_impression_id%3Dp3_1605063003_gUbib6mH0AtLYOBy%22%7D; frmfctr=compact; cfrmfctr=MOBILE; cbkp=1; jitney_client_session_updated_at=1605065419; bm_sv=A59E53FF6503277293D4FE5EC8EC959A~rlNH6I4nq5UcS7vbb7I1B65+y9a5MLFS2wtvEJxrVsbbAF/9aNp++ESPLJny8a2hZ9x4O/Aw3+tnT2NLfb84KUjZ58si+EXF0m7mZdPCEXmon9lEQNaKuwZDFPPpdgzXN2YVeFmNgbt1DKBJPzpyLHdj71TBIFwpbV8X6gwnxfE=; bev=1605057283_ZTU4YThiMzgzYzkw; country=ID; cdn_exp_da1663c66e2988797=control; cdn_exp_e437bcda7f41486a6=extend_one_three_seven_days; cdn_exp_f699727e78669251b=treatment; ak_bmsc=2B087BC58DED1ECB69C63B7053A27566173DCD1FB62C0000A65AAB5FCEF95508~pl9cTt7KpGK1i2Cwt+EwfIAm+3J0PlBL1OCcIhzqBIgmA0Glj1cbZQIRMBDt238yq2+IyfjWR8D9/Fl6XsJuBp9BBTUSs/9HNkT1btT2fpX8nzz/A75WuWh18az12RH3cpNDRhQ+k3KXQP+JaTTd5Ix16TGZcZhlnpFOYVqm6tfpJJa6Fv2AxlgObVO10NP7ANXmF/8oezCfJpZb90a3CzkkRGHcuSXsdX3dRQUyJcIZk=; _airbed_session_id=df87a683904cfec08bb449700f7ceb47; bm_sv=A59E53FF6503277293D4FE5EC8EC959A~rlNH6I4nq5UcS7vbb7I1B65+y9a5MLFS2wtvEJxrVsbbAF/9aNp++ESPLJny8a2hZ9x4O/Aw3+tnT2NLfb84KUjZ58si+EXF0m7mZdPCEXn5g0HFLy7lKE6WDRrfv3gzclDztsOoWEaDQ36GybKwUqpr26f5wwbpU8cHbCByKYo='
    }
  };


  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = axios(config)
    .then(function (response){
      let responses = response.data.data.merlin.pdpReviews.reviews
      let reviewscomments = responses.map(function(item){
        let guest_id = item.reviewer.id
        let guest_name = item.reviewer.firstName
        let guest_comments = item.comments
        sql = 'INSERT INTO scraping_abb (id, guest_name, comments) VALUES (?, ?, ?)'
        con.query(sql, [[guest_id], [guest_name], [guest_comments]], function(err, result){
        if (err) throw err;
        console.log("1 record inserted");
      })
    })
  })
});