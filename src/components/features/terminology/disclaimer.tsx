const Disclaimer = () => {
  return (
    <footer className="max-w-7xl w-full mx-auto">
      <div className="mt-8 p-4 bg-card backdrop-blur-md backdrop-brightness-110 border-l-4 border-l-yellow-400 text-white text-sm rounded">
        <strong>Disclaimer:</strong> Kloudtech does not claim any data taken from PAGASA for our
        knowledge base. If you need more information, visit their website at
        <a
          href="https://www.pagasa.dost.gov.ph/"
          target="_blank"
          className="text-primary underline px-1"
        >
          pagasa.dost.gov.ph
        </a>
      </div>
    </footer>
  )
}

export default Disclaimer