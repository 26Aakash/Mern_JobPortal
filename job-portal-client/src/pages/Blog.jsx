import React from "react";
import { FiCalendar, FiTag, FiArrowRight, FiClock, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "How to Prepare for Technical Interviews in 2026",
      excerpt: "Master the art of technical interviews with these proven strategies. Learn about common coding challenges, system design questions, and behavioral interviews.",
      category: "Interview Prep",
      date: "March 8, 2026",
      readTime: "8 min read",
      author: "Sarah Chen",
      featured: true
    },
    {
      id: 2,
      title: "Building a Strong Resume That Stands Out",
      excerpt: "Create a compelling resume that captures attention in seconds. Learn the latest trends in resume writing and formatting for maximum impact.",
      category: "Career Development",
      date: "March 5, 2026",
      readTime: "6 min read",
      author: "Mike Johnson",
      featured: false
    },
    {
      id: 3,
      title: "Top Skills Companies Are Looking For in 2026",
      excerpt: "Stay ahead of the curve with the most in-demand technical and soft skills. From AI/ML to cloud computing, discover what's hot in the job market.",
      category: "Industry Trends",
      date: "March 3, 2026",
      readTime: "10 min read",
      author: "Alex Rivera",
      featured: false
    },
    {
      id: 4,
      title: "Remote Job Opportunities: The Future of Work",
      excerpt: "Explore the growing landscape of remote work opportunities. Learn about the best remote job platforms, salary expectations, and work-life balance tips.",
      category: "Remote Work",
      date: "February 28, 2026",
      readTime: "7 min read",
      author: "Emma Thompson",
      featured: false
    },
    {
      id: 5,
      title: "Networking Strategies for Job Seekers",
      excerpt: "Build meaningful professional connections that lead to job opportunities. Master LinkedIn networking, attend virtual events, and leverage your network effectively.",
      category: "Career Development",
      date: "February 25, 2026",
      readTime: "5 min read",
      author: "David Kim",
      featured: false
    },
    {
      id: 6,
      title: "Salary Negotiation: Getting What You Deserve",
      excerpt: "Learn the art of salary negotiation with confidence. Understand market rates, prepare your case, and negotiate benefits beyond just compensation.",
      category: "Career Development",
      date: "February 22, 2026",
      readTime: "9 min read",
      author: "Lisa Wang",
      featured: false
    }
  ];

  const categories = ["All", "Interview Prep", "Career Development", "Industry Trends", "Remote Work"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue/5 to-indigo-50/30">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue to-indigo-600 text-white">
        <div className="max-w-screen-2xl container mx-auto px-4 xl:px-24 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Career Insights & Job Tips
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Stay informed with the latest career advice, industry trends, and expert tips
              to accelerate your professional growth and job search success.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="max-w-screen-2xl container mx-auto px-4 xl:px-24 py-16 md:py-24">
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Featured Article</h2>
          {blogPosts.filter(post => post.featured).map(post => (
            <div key={post.id} className="bg-white rounded-2xl shadow-xl shadow-blue/10 border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-blue/20 transition-all duration-300">
              <div className="md:flex">
                <div className="md:w-1/2 p-8 md:p-12">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue/10 text-blue text-sm font-medium rounded-full">
                      {post.category}
                    </span>
                    <span className="text-slate-500 text-sm">•</span>
                    <span className="text-slate-500 text-sm">{post.date}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <FiUser className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <FiClock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <button className="btn-primary group">
                    Read Full Article
                    <FiArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="md:w-1/2 bg-gradient-to-br from-blue/5 to-indigo-100 flex items-center justify-center p-8">
                  <div className="w-full max-w-sm aspect-square rounded-xl bg-gradient-to-br from-blue/20 to-indigo-200 flex items-center justify-center">
                    <div className="text-center">
                      <FiTag className="h-16 w-16 text-blue mx-auto mb-4" />
                      <div className="text-blue font-semibold">Featured</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-blue hover:text-blue transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.filter(post => !post.featured).map(post => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg shadow-blue/10 border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-blue/20 hover:-translate-y-1 transition-all duration-300 group">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-blue/10 text-blue text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                  <span className="text-slate-500 text-xs">•</span>
                  <span className="text-slate-500 text-xs">{post.date}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue transition-colors">
                  {post.title}
                </h3>

                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-slate-500 text-xs">
                    <div className="flex items-center gap-1">
                      <FiUser className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <FiClock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>

                  <button className="text-blue hover:text-indigo-600 font-medium text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read More
                    <FiArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue to-indigo-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Stay Updated with Career Insights
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get the latest career tips, job market trends, and interview preparation guides
            delivered directly to your inbox.
          </p>
          <Link
            to="/"
            className="btn-primary bg-white text-slate-900 hover:bg-slate-100"
          >
            Subscribe to Newsletter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blog;