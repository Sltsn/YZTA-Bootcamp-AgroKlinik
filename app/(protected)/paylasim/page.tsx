'use client';

import { useEffect, useState } from 'react';

interface PostItem {
  id: string;
  plantName: string;
  description: string;
  status: string;
  likes: number;
  createdAt: string;
  user: { firstName: string; lastName: string; profession: string; avatar: string | null };
  analysis?: { diagnosis: string } | null;
  _count: { comments: number };
}

const statusColors: Record<string, string> = {
  'çözüldü': 'bg-green-100 text-green-700',
  'devam ediyor': 'bg-amber-100 text-amber-700',
  'beklemede': 'bg-gray-100 text-gray-600',
};

export default function PaylasimPage() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/posts')
      .then(async (res) => {
        if (!res.ok) throw new Error('Veriler alınamadı');
        const data = await res.json();
        setPosts(data.posts || []);
      })
      .catch(() => setError('Paylaşımlar yüklenirken bir hata oluştu'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Paylaşım Alanı</h1>

      {isLoading && <p className="text-gray-500">Yükleniyor...</p>}
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-4">{error}</div>
      )}
      {!isLoading && !error && posts.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
          Henüz bir paylaşım yok.
        </div>
      )}

      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">
                {post.user.avatar}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">
                  {post.user.firstName} {post.user.lastName}
                </p>
                <p className="text-sm text-gray-500">{post.user.profession}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[post.status] || 'bg-gray-100 text-gray-600'}`}>
                {post.status}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-sm font-medium">
                🌱 {post.plantName}
              </span>
              {post.analysis?.diagnosis && (
                <span className="bg-red-50 text-red-700 px-2 py-1 rounded text-sm font-medium">
                  🦠 {post.analysis.diagnosis}
                </span>
              )}
            </div>
            <p className="text-gray-700 mb-3">{post.description}</p>
            <div className="flex items-center gap-6 text-sm text-gray-500 pt-3 border-t border-gray-100">
              <span>❤️ {post.likes}</span>
              <span>💬 {post._count.comments} yorum</span>
              <span className="ml-auto">{new Date(post.createdAt).toLocaleDateString('tr-TR')}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
