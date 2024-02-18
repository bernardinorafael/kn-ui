type EmptyProductsProps = {
  query: string
}

export function EmptyProductsFallback({ query }: EmptyProductsProps) {
  return (
    <div className="p-6">
      <p>
        nenhum resultado encontrado para: <strong>{query}</strong>
      </p>
    </div>
  )
}
