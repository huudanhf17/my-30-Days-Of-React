import { Component, OnInit } from '@angular/core';
import { Author, authors } from '../author';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
})
export class AuthorListComponent implements OnInit {
  authors = authors;
  currentAuthor = authors[0];
  constructor() {}

  ngOnInit(): void {}

  onSelect(author: Author) {
    this.currentAuthor = author;
  }

  onDelete(id: number) {
    this.authors = this.authors.filter((author) => author.id !== id);

    if (this.currentAuthor.id === id) {
      this.currentAuthor = this.authors[0];
    }
  }
}
