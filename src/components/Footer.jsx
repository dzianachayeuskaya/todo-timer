function Footer() {
  return (
    <footer
      className=' text-center text-white fixed-bottom'
      style={{ backgroundColor: 'rgba(33,37,41, 1)' }}>
      <div className='container p-3'>© {new Date().getFullYear()}</div>
    </footer>
  );
}
export { Footer };
