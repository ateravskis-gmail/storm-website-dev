import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function BlogPostNotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-storm-light via-white to-storm-light">
      <Navbar forceScrolled />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-6">
          The blog post you are looking for does not exist or may have been moved.
        </p>
        <Link href="/blog" className="text-storm-primary hover:text-storm-secondary font-semibold">
          Back to Blog
        </Link>
      </div>
      <Footer />
    </main>
  )
}
