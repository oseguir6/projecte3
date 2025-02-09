import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Calendar, Tag, ArrowLeft, Clock } from "lucide-react";
import type { Blog } from "@shared/schema";
import { Link, useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet";

export default function BlogPage() {
  const { slug } = useParams();
  const { data: blogs = [] } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
  });

  const slugify = (title: string) => {
    return title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  const blog = blogs.find(b => slugify(b.title) === slug);

  const calculateReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200); // Asumiendo 200 palabras por minuto
    return minutes;
  };

  const getRelatedPosts = (currentBlog: Blog) => {
    return blogs
      .filter(b => 
        b.id !== currentBlog.id && // Excluir el post actual
        b.tags.some(tag => currentBlog.tags.includes(tag)) && // Al menos un tag en común
        b.published // Solo posts publicados
      )
      .slice(0, 3); // Limitar a 3 posts relacionados
  };

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog not found</h1>
          <Link href="/" className="text-[#E94560] hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const readTime = calculateReadTime(blog.content);
  const relatedPosts = getRelatedPosts(blog);

  return (
    <>
      <Helmet>
        <title>{blog.title} | Portfolio Blog</title>
        <meta name="description" content={blog.content.substring(0, 155)} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.content.substring(0, 155)} />
        {blog.image && <meta property="og:image" content={blog.image} />}
        <meta name="keywords" content={blog.tags.join(', ')} />
      </Helmet>

      <div className="min-h-screen bg-[#0A0A0A] py-20">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-[#E94560] hover:underline inline-flex items-center gap-2 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {blog.image && (
              <div className="aspect-video rounded-lg overflow-hidden mb-8">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {blog.title}
            </h1>

            <div className="flex items-center gap-6 text-white/60 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(blog.createdAt!).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{readTime} min read</span>
              </div>
              {blog.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  <div className="flex gap-2">
                    {blog.tags.map((tag, index) => (
                      <span key={index} className="bg-[#1A1A2E] px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="prose prose-invert prose-lg max-w-none">
              <div 
                className="text-white/80 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-white mb-8">Related Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((post) => (
                    <Link key={post.id} href={`/blogs/${slugify(post.title)}`}>
                      <Card className="bg-[#1A1A2E] border-[#16213E] hover:border-[#E94560] transition-colors cursor-pointer h-full">
                        {post.image && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle className="text-lg text-white">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(post.createdAt!).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.article>
        </div>
      </div>
    </>
  );
}