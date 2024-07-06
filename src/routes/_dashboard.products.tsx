import { House } from "@phosphor-icons/react/dist/ssr";
import { createFileRoute } from "@tanstack/react-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import { api } from "@/src/lib/axios.ts";
import { useSidebar } from "@/src/stores/use-sidebar.ts";
import { cn } from "@/src/util/cn";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_dashboard/products")({
  component: ProductsPage,
});

function ProductsPage() {
  const sidebar = useSidebar((store) => ({ expanded: store.expanded }));

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get("/products");
      return res.data.products;
    },
  });

  console.log(products);

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1192px] space-y-12",
        "self-end p-8 transition-width duration-300",
        sidebar.expanded && "max-w-[1400px]"
      )}
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <House size={16} />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Produtos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
