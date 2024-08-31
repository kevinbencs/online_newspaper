

const Auth = ({params}: {params:{name: string}}) => {
  return (
    <div>
      <h2 className="text-center text-3xl mb-10 capitalize">{params.name.replaceAll('_',' ')}</h2>
    </div>
  )
}

export default Auth;