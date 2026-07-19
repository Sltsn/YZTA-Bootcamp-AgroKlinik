'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';

interface AnalysisItem {
  id: string;
  diagnosis: string;
  solutions: string[];
  status: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  'çözüldü': 'bg-green-100 text-green-700',
  'devam ediyor': 'bg-amber-100 text-amber-700',
  'beklemede': 'bg-gray-100 text-gray-600',
};

export default function GecmisPage() {
  const { token } = useAuthStore();
  const [analyses, setAnalyses] = useState<AnalysisItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    fetch('/api/analysis', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Veriler alınamadı');
        const data = await res.json();
        setAnalyses(data.analyses || []);
      })
      .catch(() => setError('Geçmiş veriler yüklenirken bir hata oluştu'))
      .finally(() => setIsLoading(false));
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Geçmiş Veriler</h1>

      {isLoading && <p className="text-gray-500">Yükleniyor...</p>}
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-4">{error}</div>
      )}
      {!isLoading && !error && analyses.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
          Henüz bir analiz kaydınız yok.
        </div>
      )}

      <div className="space-y-4">
        {analyses.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-900">{item.diagnosis}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[item.status] || 'bg-gray-100 text-gray-600'}`}>
                {item.status}
              </span>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mb-3">
              {item.solutions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <p className="text-xs text-gray-400">
              {new Date(item.createdAt).toLocaleDateString('tr-TR')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
