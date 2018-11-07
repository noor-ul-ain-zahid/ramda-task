import { notExisting } from '../parser/helpers'
export const publisherValidator = (values, props) => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  else if (!notExisting(props.publishers, values, props.lastId)) {
    errors.name = 'Publisher with this name already exists'
  }
  if (!values.address) {
    errors.address = 'Required'
  } else if (values.address.length < 10) {
    errors.address = 'Minimum be 10 characters or more'
  }
  if (!values.books) {
    errors.books = 'Required'
  }
  return errors
}

export const authorValidator = (values, props) => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  else if (!notExisting(props.authors, values, props.lastId)) {
    errors.name = 'Author with this name already exists'
  }
  if (!values.dob) {
    errors.dob = 'Required'
  }
  if (!values.books) {
    errors.books = 'Required'
  }
  return errors
}

export const bookValidator = (values, props) => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  else if (!notExisting(props.books, values, props.lastId)) {
    errors.name = 'Book with this name already exists'
  }
  if (!values.author) {
    errors.author = 'Required'
  }
  if (!values.publisher) {
    errors.publisher = 'Required'
  }
  return errors
}