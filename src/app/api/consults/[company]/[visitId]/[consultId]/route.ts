import sanityClient from '@/lib/sanityClient';
import { NextRequest, NextResponse } from 'next/server';
import React from 'react';

export async function PATCH(req: NextRequest, { params }: { params: { consultId: string }}) {

 const { consultId } = params
 const body = await req.json()

 console.log('body_api/consults/[company]/[visitId]/[consultId]/route/PATCH: ',body)

 try {
  const cleanedBody: Record<string, any> = {}
  for (const key in body) {
   const value = body[key]
   if (value !== "" && value !== null && value !== undefined) {
    cleanedBody[key] = value
   }
  }
  const updatedConsult = await sanityClient
   .patch(consultId)
   .set(body)
   .commit()
   
  return NextResponse.json(updatedConsult)
 } catch (error) {
  console.error('Error updating consult: ',error)
  return new Response("Error updating consult", { status: 500 })
 }
}

