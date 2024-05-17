import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { PaginationItem } from "@mui/material";
import MuiPagination from "@mui/material/Pagination";
import { DataGrid } from "@mui/x-data-grid";
import { Fragment } from "react";

const CustomDataTable = (props: any) => {
  const {
    isLoading,
    rows,
    columns,
    page,
    totalPage,
    onPageChange,
    onRowClick,
    hidePagination,
    height,
    ...otherProps
  } = props;
  return (
    <Fragment>
      <DataGrid
        {...otherProps}
        loading={isLoading}
        columns={columns}
        rows={rows || []}
        onRowClick={onRowClick}
        onPaginationModelChange={onPageChange}
        hideFooter
        hideFooterPagination
        hideFooterSelectedRowCount
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "" : "tw-bg-[#F6F6F6]"
        }
        sx={{
          ".MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-row:hover": {
            cursor: "pointer",
          },
          height: "100%",
          maxWidth: "100%",
        }}
        autoHeight={true}
        disableExtendRowFullWidth={true}
      />

      {!hidePagination && (
        <div className="tw-mt-2">
          <MuiPagination
            className="tw-flex tw-items-center"
            onChange={(_e, page) => {
              if (!onPageChange) {
                return;
              }
              onPageChange(page);
            }}
            page={page || 0}
            count={totalPage || 0}
            showFirstButton={true}
            showLastButton={true}
            renderItem={(item) => {
              return (
                <PaginationItem
                  {...item}
                  color="primary"
                  shape="rounded"
                  slots={{
                    first: KeyboardDoubleArrowLeftIcon,
                    last: KeyboardDoubleArrowRightIcon,
                  }}
                />
              );
            }}
          />
        </div>
      )}
    </Fragment>
  );
};

export default CustomDataTable;
