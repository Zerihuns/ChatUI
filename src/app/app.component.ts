import {Component, ElementRef, ViewChild} from '@angular/core';

let Fake = [
  'Nice to meet you',
  'How are you?',
  'Not too bad, thanks',
  'What do you do?',
  'That\'s awesome',
  'Codepen is a nice place to stay',
  'I think you\'re a nice person',
  'Why do you think that?',
  'Can you explain?',
  'Anyway I\'ve gotta go now',
  'It was a pleasure chat with you',
  'Time to make a new codepen',
  'Bye',
  ':)'
]

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.scss']
})
export class AppComponent {
 title = 'chat-ui';

 @ViewChild('chatListContainer') list?: ElementRef<HTMLDivElement>;
 chatInputMessage: string = "";
 human = {
   id: 1,
   profileImageUrl: 'https://thumbs.dreamstime.com/b/vector-icon-user-avatar-web-site-mobile-app-man-face-flat-style-social-network-profile-45836554.jpg'
 }

 bot = {
   id: 2,
   profileImageUrl: 'https://cdn.dribbble.com/users/1787323/screenshots/11427608/media/2da7db905079fc586f700e5934a64e46.png'
 }

 chatMessages: {
   user: any,
   message: string
 }[] = [
   {
     user: this.bot,
     message: "Hi there, I\'m Fabio and you?"
   },
 ];

 ngAfterViewChecked() {
   this.scrollToBottom()
 }

 send() {
   this.chatMessages.push({
     message: this.chatInputMessage,
     user: this.human
   });

   this.chatInputMessage = ""
   this.chatMessages.push({
    message: Fake[getRandomInt(Fake.length)],
    user: this.bot
  });
   this.scrollToBottom()
 }

 scrollToBottom() {
   const maxScroll = this.list?.nativeElement.scrollHeight;
   this.list?.nativeElement.scrollTo({top: maxScroll, behavior: 'smooth'});
 }

 generateFakeId(): string {
   const current = new Date();
   const timestamp = current.getTime();
   return timestamp.toString()
 }

 clearConversation() {
  localStorage.removeItem('fakeUserId')
  localStorage.setItem('fakeUserId', this.generateFakeId())
  this.chatMessages = [
    {
      user: this.bot,
      message: "Hi there, I\'m Fabio and you?"
    },
  ];
 }
}
