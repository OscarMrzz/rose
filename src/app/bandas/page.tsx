import BandasCardCompnent from "@/components/BandasCardCompnent";

export default function Page() {
  return (
    <div className="w-full py-10 px-2 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-2 ">
        <BandasCardCompnent
          nombre="Banda Tecno"
          categoria="Categoria 1"
          grupo="Grupo 1"
          subcGrupo="1"
        />
        <BandasCardCompnent
          nombre="Banda Patria"
          categoria="Categoria 2"
          grupo="Grupo 2"
          subcGrupo="2"
        />
        <BandasCardCompnent
          nombre="Banda 3"
          categoria="Categoria 3"
          grupo="Grupo 1"
          subcGrupo="1"
        />
        <BandasCardCompnent
          nombre="Banda 4"
          categoria="Categoria 4"
          grupo="Grupo 2"
          subcGrupo="2"
        />
      </div>
    </div>
  );
}
