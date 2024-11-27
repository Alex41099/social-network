import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import ReactPaginate from "react-paginate"
import { useAppSelector } from "../../../../app/hooks/useAppSelector"
import { user } from "../../api/userApi"
import { Link, useSearchParams } from "react-router-dom"
import { User } from "../user/User"
import s from "./PaginationBibliotec.module.css"

// Example items, to simulate fetching from another resources.

type itemsPerPageType = {
  itemsPerPage: number
  initialPage: number
}

export function PaginatedItems({ itemsPerPage, initialPage }: itemsPerPageType) {
  const getUsers = useAppSelector((state) => state.users)
  const items = getUsers.totalCount
  const myArray = Array.from({ length: items }, (_, i) => i + 1)

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0)

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage
  console.log(`Loading items from ${itemOffset} to ${endOffset}`)
  const currentItems = myArray.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(myArray.length / itemsPerPage)

  // Invoke when user click to request another page.

  const [currentPage, setCurrentPage] = useState(1)
  const [mode, setMode] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const pageUrl = searchParams.get("page")

  useEffect(() => {
    console.log(currentPage)

    if (!mode) {
      setCurrentPage(Number(pageUrl))
    } else {
      setSearchParams({ page: currentPage.toString() })
    }
    setMode(true)
  }, [currentPage])

  const handlePageClick = (event: any) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    setCurrentPage(event.selected + 1)
    const newOffset = (event.selected * itemsPerPage) % items
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)
    setItemOffset(newOffset)
  }

  return (
    <>
      <ReactPaginate
        initialPage={initialPage}
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        className={s.paginate}
        activeLinkClassName={s.active}
      />
    </>
  )
}

// Add a <div id="container"> to your HTML to see the component rendered.
