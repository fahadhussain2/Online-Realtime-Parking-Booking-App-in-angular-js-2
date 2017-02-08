import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable, AngularFireAuth} from 'angularfire2';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  mymessages=[];
  allmessages=[];
  messageskeys=[];
  isAdmin:boolean = false;
  timeout:boolean=false;

  constructor(private af: AngularFire) {
    this.af.auth.subscribe(user=>{
      if(user !==null){
        this.af.database.object('accounts/' + user.uid).subscribe(admin=>{
          if(admin.email === 'admin@gmail.com'){
            this.isAdmin = true;
            this.af.database.list('messages/').subscribe(allmessages=>{
              let tmp=[];
              for(let i=0; i<allmessages.length; i++){
                  tmp.push({
                    name: allmessages[i].name,
                    message: allmessages[i].message,
                    reply:allmessages[i].reply,
                    uid:allmessages[i].uid
        })
        
        this.messageskeys.push({
          key:allmessages[i].$key
        })
        
      } 

      this.allmessages = tmp;
            })
          }
        })
     this.af.database.list('messages/').subscribe(messages =>{
      for(let i=0; i<messages.length; i++){
        if(messages[i].uid === user.uid){
        this.mymessages.push({
          name: messages[i].name,
          message: messages[i].message,
          reply:messages[i].reply
        })
        }
      }

     })
      }
    })
     
  }

  ngOnInit() {
    setTimeout(()=> {
      this.timeout=true;
    }, 3000);
  }

  reply(reply,i){
    this.af.database.object('messages/' + this.messageskeys[i].key).update({'reply': reply.value})

  }

}
