const GridContainer: React.FC = ({ children }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 xl:grid-cols-3">
      {children}
    </div>
  )
}

export default GridContainer
