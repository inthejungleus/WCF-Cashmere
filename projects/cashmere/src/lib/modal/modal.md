The modal component can be configured for different originating sizes (widths). To do so simply pass to the `ModelService`'s open method a `ModalOptions` object  with a `size` attribute containing one of these values: `sm, md, lg`. See provided examples tab for a demonstration of configurable sizes. 

The resulting modal will begin at a predetermined size based on your selection but will respond to smaller screen sizes. If no size attribute is passed into the modal then it will AUTO size to grow based on content provided. In this case as in all cases it is recommended to only provide responsive content to the modal otherwise the viewing experience will not respond to screen sizes.

NOTE! It is the responsibility of any consumer of the modal to ensure their modal content that is being passed into the Modal is also responsive in design.
