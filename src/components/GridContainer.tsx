const GridContainer: React.FC = ({ children }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4">{children}</div>
  )
}

export default GridContainer
