import './BooksManager.css';
import React,{Component} from 'react';
import books from '../../../books'
import Book from '../../book/Book';
import {Link} from 'react-router-dom';

 class BooksManager extends Component {
     constructor(props){
         super(props)
         this.state={
             books:books
         }
     }
     render() {
        return (
          <div className="books">
              
                
                {this.state.books.map((item, index) => {
                 
                    const {_id,title,isbn}=item;
                  return (
                <Link className="link" to={{pathname:`book-detail/${_id}/${title}`, state:item   }  } key={isbn}  >
                    <Book
                      data={item}
                     
                     
                    />
                </Link>
                
              
                  );
                })}
          
        
          </div>
        );
      }
  
    }

     
    


export default BooksManager
