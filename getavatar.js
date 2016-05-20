var Syncano = require('syncano');
var connection = Syncano({apiKey: 'aec2a9da920992adbe58151a9b4ab47edf4195cb',
                          userKey: '01c8b17e74f29b92f4f5413ecde5986cbae1349a', 
                          defaults: { 
                                      instanceName: "interactiveboard", 
                                      className: "players"
                                    }
                         });


module.exports = {
   createPlayer: function() {
   
      var playernickname = document.getElementById("nicknameinput");
      var avatar = document.getElementsByClassName.getAttribute("active-color");
   
       var dataObject = {
       avatar: playernickname, 
       nickname: avatar,
       email:"xamam@gmamal"
      }

      DataObject.please().create(dataObject).then();
      console.log(avatar);
   }

     
}
      

