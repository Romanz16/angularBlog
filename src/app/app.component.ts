import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'les17Blog';
  login: string = '';
  pass: string = '';
  error: string = '';
  success: string = '';
  myRole: string = '';
  myLogin: string = '';
  authorizationStatus: boolean = false;
  titleBlog: string = '';
  contentBlog: string = '';
  editIndex: number;
  editTitle: string;
  editContent: string;

  user: Array<Users> = [
    {
      login: 'admin',
      pass: 'admin',
      role: 'admin'
    }
  ];
  recordBlog: Array<RecordBlog> = [
    {
      title: 'Hello',
      content: 'Hello. My friends!',
      author: 'admin',
      date: '2019-08-28 16:06:30'
    },
    {
      title: 'HTML5',
      content: 'HTML5 — наступна версія мови HTML. До складу робочої групи з HTML5 увійшли AOL, Apple, Google, IBM, Microsoft, Mozilla, Nokia, Opera та кілька сотень інших виробників.',
      author: 'admin',
      date: '2019-08-28 16:19:30'
    }
  ]
  authorization(): void {
    this.success = '';
    this.error = '';
    let er = false;
    if (this.login === '' || this.pass === '') {
      this.error = 'Заповніть усі поля!';
    } else {
      for (let i: number = 0; i < this.user.length; i++) {
        if (this.user[i].login === this.login) {
          this.myLogin = this.user[i].login;
          this.myRole = this.user[i].role;
          this.authorizationStatus = true;
          this.success = `Вітаємо ${this.myLogin} ви авторизувались`;
          er = true;
        }
      }
      if (!er) this.error = 'Ви ввели невірний логін або пароль!';
    }
  }

  registration(): void {
    this.success = '';
    this.error = '';
    if (this.login === '' || this.pass === '') {
      this.error = 'Заповніть усі поля!';
    } else {
      if (this.user.some(elem => elem.login === this.login)) {
        this.error = 'Даний логін уже зайнятий!';
      } else {
        const newUser = new Users(this.login, this.pass, 'guest');
        this.user.push(newUser);
        this.myLogin = this.login;
        this.myRole = 'guest';
        this.authorizationStatus = true;
        this.success = `Вітаємо ${this.login} ви зареєструвались та авторизувались`;
      }
    }
  }
  exit(): void {
    this.login = '';
    this.pass = '';
    this.myLogin = '';
    this.myRole = '';
    this.authorizationStatus = false;
  }
  addRecord(): void {
    if (this.titleBlog !== '' && this.contentBlog !== '') {
      let mydate1 = new Date();
      let hh = mydate1.getHours();
      let mm = mydate1.getMinutes();
      let ss = mydate1.getSeconds();
      let hrs, min, sec = '';
      if (hh < 10) hrs = '0' + hh; else hrs = hh;
      if (mm < 10) min = '0' + mm; else min = mm;
      if (ss < 10) sec = '0' + ss; else sec = '' + ss;
      const d: string = mydate1.getFullYear() + '-' + mydate1.getMonth() + 1 + '-' + mydate1.getDate() + ' ' + hrs + ':' + min + ':' + sec;
      const newRecord = new RecordBlog(this.titleBlog, this.contentBlog, this.myLogin, d);
      this.titleBlog = '';
      this.contentBlog = '';
      this.recordBlog.push(newRecord);
    } else {
      alert('Заповніть усі поля!');
    }
  }
  deleteRecord(index: number): void {
    this.recordBlog.splice(index, 1);
  }
  editRecord(i: number): void {
    this.success = '';
    this.error = '';
    this.editTitle = this.recordBlog[i].title;
    this.editContent = this.recordBlog[i].content;
    this.editIndex = i;
  }
  saveEdit(): void {
    if (this.editTitle !== '' && this.editContent !== '') {
      this.recordBlog[this.editIndex].title = this.editTitle;
      this.recordBlog[this.editIndex].content = this.editContent;
    } else this.error = 'Заповніть усі поля!'
  }
  loginForm(): void {
    this.success = '';
    this.error = '';
    this.login = '';
    this.pass = '';
  }
}

class Users {
  constructor(public login: string, public pass: string, public role: string) {
    this.login = login;
    this.pass = pass;
    this.role = role;
  }
}
class RecordBlog {
  constructor(public title: string, public content: string, public author: string, public date: string) {
    this.title = title;
    this.content = content;
    this.author = author;
    this.date = date;
  }
}
