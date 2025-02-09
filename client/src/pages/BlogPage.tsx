import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import type { Blog } from "@shared/schema";
import { Link, useParams } from "wouter";
import ReactMarkdown from 'react-markdown';

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

  return (
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

          <div className="prose prose-invert max-w-none">
            <ReactMarkdown className="text-white/80 text-lg leading-relaxed">
              {blog.content}
            </ReactMarkdown>
          </div>
        </motion.article>
      </div>
    </div>
  );
}