'use client'; // Menandai komponen ini sebagai Client Component

import React, { useState, useEffect } from 'react';

function Rating() {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [allRatings, setAllRatings] = useState<number[]>([]);
  const [feedbacks, setFeedbacks] = useState<{ name: string; comment: string }[]>([]);

  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem('allRatings') || '[]');
    const savedFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    setAllRatings(savedRatings);
    setFeedbacks(savedFeedbacks);
  }, []);

  const averageRating = allRatings.length ? (allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1) : '0';
  const ratingPercentage = allRatings.length ? ((Number(averageRating) / 5) * 100).toFixed(1) : '0';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && comment && rating) {
      const newRatings = [...allRatings, rating];
      const newFeedbacks = [...feedbacks, { name, comment }];
      setAllRatings(newRatings);
      setFeedbacks(newFeedbacks);
      localStorage.setItem('allRatings', JSON.stringify(newRatings)); // Simpan di localStorage
      localStorage.setItem('feedbacks', JSON.stringify(newFeedbacks)); // Simpan di localStorage
      alert("Komentar dan rating berhasil dikirim!");
      setName('');
      setComment('');
      setRating(0);
    } else {
      alert("Mohon isi semua kolom dan pilih rating.");
    }
  };

  const handleDelete = (index: number) => {
    const newFeedbacks = feedbacks.filter((_, i) => i !== index);
    setFeedbacks(newFeedbacks);
    const updatedRatings = allRatings.filter((_, i) => i !== index);
    setAllRatings(updatedRatings);

    localStorage.setItem('allRatings', JSON.stringify(updatedRatings));
    localStorage.setItem('feedbacks', JSON.stringify(newFeedbacks));

    alert("Komentar berhasil dihapus! (permanen dari tampilan dan localStorage)");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ color: "#4CAF50", textAlign: "center", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>Formulir Komentar</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1.5em" }}>
          <label htmlFor="name" style={{ fontSize: "16px", color: "#333", fontWeight: "600" }}>Nama:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Masukkan nama Anda"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
              fontSize: "16px",
              marginTop: "8px",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ marginBottom: "1.5em" }}>
          <label htmlFor="comment" style={{ fontSize: "16px", color: "#333", fontWeight: "600" }}>Komentar:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            placeholder="Tulis komentar Anda di sini"
            rows={4}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
              fontSize: "16px",
              marginTop: "8px",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ marginBottom: "1.5em" }}>
          <label style={{ fontSize: "16px", color: "#333", fontWeight: "600" }}>Rating:</label>
          <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  fontSize: "30px",
                  cursor: "pointer",
                  color: star <= rating ? "#FFD700" : "#ddd",
                  transition: "color 0.2s ease"
                }}
                onClick={() => setRating(star)}
                aria-label={`Rate ${star} stars`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          style={{
            padding: "12px 18px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            fontSize: "16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "background-color 0.3s ease"
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#45a049"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4CAF50"}
        >
          Kirim Komentar
        </button>
      </form>

      <div style={{ marginTop: "2em" }}>
        <h3 style={{ color: "#333", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
          Rata-Rata Rating: {averageRating} dari 5 bintang
        </h3>
        <div style={{ width: "100%", backgroundColor: "#ddd", borderRadius: "10px", height: "20px" }}>
          <div style={{
            width: `${ratingPercentage}%`,
            backgroundColor: "#4CAF50",
            height: "100%",
            borderRadius: "10px",
            transition: "width 0.3s ease"
          }} />
        </div>
        <div style={{ textAlign: "center", color: "#333", fontSize: "14px", marginTop: "5px" }}>
          {ratingPercentage}% / 100%
        </div>
      </div>

      <div style={{ marginTop: "2em" }}>
        <h3 style={{ color: "#4CAF50", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>Daftar Komentar</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ padding: "12px", color: "#4CAF50", textAlign: "left", fontWeight: "600" }}>Nama</th>
              <th style={{ padding: "12px", color: "#4CAF50", textAlign: "left", fontWeight: "600" }}>Komentar</th>
              <th style={{ padding: "12px", color: "#4CAF50", textAlign: "left", fontWeight: "600" }}>Rating</th>
              <th style={{ padding: "12px", textAlign: "center", fontWeight: "600" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback, index) => (
              <tr key={index}>
                <td style={{ padding: "12px", color: "#333" }}>{feedback.name}</td>
                <td style={{ padding: "12px", color: "#333" }}>{feedback.comment}</td>
                <td style={{ padding: "12px", color: "#333" }}>
                  {/* Menampilkan rating yang sesuai */}
                  {allRatings[index] ? (
                    <span style={{ fontSize: "20px", color: "#FFD700" }}>
                      {'★'.repeat(allRatings[index])}
                      {'★'.repeat(5 - allRatings[index]).split('').map(() => '☆').join('')}
                    </span>
                  ) : (
                    "Belum ada rating"
                  )}
                </td>
                <td style={{ padding: "12px", textAlign: "center" }}>
                  <button
                    onClick={() => handleDelete(index)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#d32f2f"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "red"}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Rating;
