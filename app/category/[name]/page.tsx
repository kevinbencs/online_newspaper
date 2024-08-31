
const Heading = ({params}: {params:{name: string}}) => {
  return (
    <div>
      <h2>{params.name}</h2>
    </div>
  )
}

export default Heading;