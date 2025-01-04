import { redirect } from 'next/navigation'

export default async function Base() {
    redirect('/main/home')
}