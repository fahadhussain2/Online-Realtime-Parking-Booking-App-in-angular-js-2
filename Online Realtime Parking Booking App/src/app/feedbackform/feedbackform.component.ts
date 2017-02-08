import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable, AngularFireAuth} from 'angularfire2'

@Component({
  selector: 'app-feedbackform',
  templateUrl: './feedbackform.component.html',
  styleUrls: ['./feedbackform.component.css']
})
export class FeedbackformComponent implements OnInit {

  feedbackForm:FormGroup;
  currentuser;
  uid;
  success:boolean= false;
  error:boolean=false;
  constructor(private fb:FormBuilder, private af: AngularFire) {
    this.feedbackForm= this.fb.group({
      message:[null, Validators.required]
    })

    this.af.auth.subscribe(user=>{
      if (user !== null){
        this.uid= user.uid;
        this.af.database.object('accounts/' + user.uid).subscribe(name=>{
          this.currentuser= name.fname;
          console.log(this.currentuser);
        });
      }})
  }

  ngOnInit() {
  }

  sendMessage(){
    if(this.feedbackForm.value.message){
    this.af.database.list('messages/').push({
      name:this.currentuser,
      message:this.feedbackForm.value.message,
      uid:this.uid,
      reply: ''
    })
    
    this.success=true;
    this.error=false;
  }
  else{
    this.error=true;
    this.success=false;
  }
  }
}
