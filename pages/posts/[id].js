import {getSession} from 'next-auth/react'

export default function PostId({session}){
    console.log(session)
    return(
        <div>
            working
        </div>
    )
}

export async function getServerSideProps(context){
    const session = await getSession({req: context.req})
    
 return {
     props: {
            session: session
     }
 }
}