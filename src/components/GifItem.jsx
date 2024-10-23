export const GifItem = ({ title, url, id }) => {
  return (
    <div className="card" id={id}>
        <img src={ url } alt={ title } />
        <p>{ title }</p>
    </div>
  )
}
