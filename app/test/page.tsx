'use client'
import { useRequest } from 'ahooks'
import { fetchUserData } from '@/utils'
export default function page() {
    const {data} = useRequest(()=>{
        return fetchUserData({
          email: 'orgil@ihotel.mn',
          password: 'Wave920110@',
        });
    })
    console.log(data)
  return (
    <div>page</div>
  )
}
