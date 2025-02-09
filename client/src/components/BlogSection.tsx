import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Calendar, Tag } from "lucide-react";
import type { Blog } from "@shared/schema";

export default function BlogSection() {
  const { data: blogs = [] } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
  });

  const { data: blogTitle = "Latest Blog Posts" } = useQuery({
    queryKey: ["/api/site-content/blog.title"],
    select: (data: any) => data.value,
  });

  const { data: blogSubtitle = "Insights & Tutorials" } = useQuery({
    queryKey: ["/api/site-content/blog.subtitle"],
    select: (data: any) => data.value,
  });

  const publishedBlogs = blogs.filter(blog => blog.published);

  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            {blogTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/70 max-w-2xl mx-auto"
          >
            {blogSubtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedBlogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1A1A2E] rounded-lg overflow-hidden border border-[#16213E] group hover:border-[#E94560] transition-colors"
            >
              {blog.image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-white/70 mb-4 line-clamp-3">
                  {blog.content}
                </p>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(blog.createdAt!).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span>{blog.tags.length} tags</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {publishedBlogs.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/70 mt-8"
          >
            No blog posts available yet. Check back soon!
          </motion.p>
        )}
      </div>
    </section>
  );
}