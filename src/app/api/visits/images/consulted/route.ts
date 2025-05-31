import sanityClient from '@/lib/sanityClient';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
 const { visitId, imageKey } = await req.json();
 
// console.log('imageKey_api/visits/images/consulted: ',imageKey)

 try {
  const result = await sanityClient
   .patch(visitId)
   // .setIfMissing({ visitPhoto: [] })
   .set({ [`visitPhoto[_key=="${imageKey}"].isConsulted`]: true })
   .commit()

  // console.log('result_api/visits/images/consulted',result)

  return NextResponse.json({ success: true, result })
 } catch (error) {
  console.error('Error updating image isConsulted: ', error)
  return NextResponse.json({ success: false, error }, { status: 500 })
 }
}