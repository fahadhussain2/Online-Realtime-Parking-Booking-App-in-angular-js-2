import { Component } from '@angular/core';
import {UserService} from './Services/userService';
import {AngularFire} from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  login:boolean=false;
  name:string;
  isAdmin:boolean;
  currentUser;
  messages=[];
  counter:number;
  counter1:number;
  constructor(private us:UserService, private af:AngularFire ){
    this.af.auth.subscribe(user=>{
      if(user !=null){
        this.currentUser= user.uid;
        this.login = true;
        this.af.database.object('accounts/' + user.uid).subscribe(x=>{
          this.name = x.fname;
          console.log('name',x.fname)
          if(x.email === 'admin@gmail.com'){
            this.isAdmin = true;
            
          }
          else{
            this.isAdmin = false;

          }
        })
      }
      else{
        this.login = false;
      }
    })

    // this.fetchMessages();
    this.adminMessageCounter();
    // console.log('counter',this.messages.length)
  }

  logout(){
    this.us.logOut();
    this.name='';
  }

  // fetchMessages(){
    
  //   this.af.database.list('messages/').subscribe(messages=>{
  //     let messagesCounter=[]
  //     for (let i=0; i<messages.length; i++){
  //       if(this.currentUser === messages[i].uid)
  //       {
  //         messagesCounter.push({
  //           name:messages[i].name,
  //           message:messages[i].message,
  //           reply:messages[i].reply,
  //         })
  //       }
  //     }
  //      this.messages= messagesCounter;
  //     this.counter1=messagesCounter.length;
      
  //     // console.log('counter', this.counter);
  //   })
  // }

  adminMessageCounter(){
    this.af.database.list('messages/').subscribe(messages=>{
      this.counter= messages.length;
    })
  }


}
