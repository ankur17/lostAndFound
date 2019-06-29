/**
 * Created by ankur on 13/6/19.
 */





export const automaticComplainAssign = ()=>{
    policeAvailableRef.child("available").orderByKey().limitToFirst(1).once("value",function(snapshot) {
        let availablePolice = snapshot.val()
        if(availablePolice){

            let noOfPoliceAvaibale = Object.keys(availablePolice).length;


            complainStackRef.orderByKey().limitToFirst(noOfPoliceAvaibale).once("value",function(complain_snap){

                let complain_snap = complain_snap.val()


                let key = Object.keys(availablePolice)[0];
                let availablePolice = availablePolice[key]
                let timestamp  = Date.now();
                let complainData = {
                    complainId : complainId,
                    ...availablePolice,
                    ...user,
                    assigned_timestamp : timestamp,
                }

                if(complain_snap){
                    // ready add to compains now

                    complainRef.child(complainId).set(complainData,function (err) {
                        if(err){
                            callback("ERROR Hai",null)
                        }else {
                            callback(null,complainData);
                        }
                    })


                }

            })



        }
    })
}






