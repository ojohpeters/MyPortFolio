export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-6 border-t">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>© {currentYear} Peters Ojoh. All rights reserved.</p>
      </div>
    </footer>
  )
}
