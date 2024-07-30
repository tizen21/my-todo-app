"use client";

export default function Button({ title, color, onClick }) {
  return (
    <button className={`btn btn-outline btn-${color}`} onClick={onClick}>
      {title}
    </button>
  );
}
