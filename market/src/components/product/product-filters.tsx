import { useEffect } from "react";
import { useState } from "react";
import { useLanguage } from "../../state/language-context";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormField } from "../ui/FormField";
import { FormError } from "../ui/FormError";
import { productService } from "../../services/product.service";
import { vendorService } from "../../services/vendor.service";
import { useRequest } from "../../hooks/use-request";
import type { Vendor } from "../../types";

interface FilterForm {
  categories: string[];
  vendors: string[];
  minPrice?: number;
  maxPrice?: number;
}

const schema = yup.object({
  categories: yup.array().of(yup.string()),
  vendors: yup.array().of(yup.string()),
  minPrice: yup.number().transform(v=> (isNaN(v)?undefined:v)).nullable(),
  maxPrice: yup.number().transform(v=> (isNaN(v)?undefined:v)).nullable(),
});

export const ProductFilters: React.FC<{ onApply?: (v: any) => void }> = ({ onApply }) => {
  const { language } = useLanguage();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    vendor: true,
    price: true,
  });

  const { register, handleSubmit, formState:{errors} } = useForm({
    resolver: yupResolver(schema) as any,
    defaultValues:{ categories:[], vendors:[] }
  });

  const {
    data: categories,
    loading: catLoading,
  } = useRequest(() => productService.getCategories(), { auto: true });

  const {
    data: vendorRes,
    loading: vendorLoading,
  } = useRequest(() => vendorService.getVendors({ limit: 100 }), { auto: true });

  const vendors: Vendor[] = vendorRes?.data ?? [];
 
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const submit = (values: any) => {
    onApply?.(values);
  };

  const resetFilters = () => {
    window.location.reload();
  };
 
  return (
    <form onSubmit={handleSubmit(submit)} className="card p-6 space-y-6">
      <h3 className="text-lg font-bold text-gray-900">{language === 'ha' ? 'Tacewa' : 'Filters'}</h3>

      {/* Price Range Filter */}
      <div >
        <button
          type="button"
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full py-2 text-left"
        >
          <span className="font-medium text-gray-900">{language==='ha'? 'Farashi' : 'Price Range'}</span>
          {expandedSections.price ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
          )}
        </button>

        {expandedSections.price && (
          <div className="mt-3 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="Min ₦" {...register('minPrice' as any)} className={`input-text ${(errors as any).minPrice ? 'input-error' : ''}`} />
              <input type="number" placeholder="Max ₦" {...register('maxPrice' as any)} className={`input-text ${(errors as any).maxPrice ? 'input-error' : ''}`} />
            </div>
          </div>
        )}
      </div>

      {/* Categories */}
      <div>
        <button type="button" onClick={() => toggleSection('category')} className="flex items-center justify-between w-full py-2 text-left">
          <span className="font-medium text-gray-900">{language==='ha'? 'Rarrabuwa' : 'Category'}</span>
          {expandedSections.category ? <ChevronUpIcon className="w-5 h-5 text-gray-500" /> : <ChevronDownIcon className="w-5 h-5 text-gray-500" />}
        </button>
        {expandedSections.category && (
          <div className="mt-3 space-y-2 max-h-56 overflow-y-auto">
            {catLoading && <p>Loading...</p>}
            {categories?.map((c) => (
              <label key={c.name} className="flex items-center">
                <input type="checkbox" value={c.name} {...register('categories')} className="rounded border-gray-300 text-primary focus:ring-primary"/>
                <span className="ml-2 text-sm text-gray-700">{language==='ha'? c.nameHa : c.name} <span className="text-gray-500 ml-1">({c.count})</span></span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Vendors */}
      <div>
        <button type="button" onClick={() => toggleSection('vendor')} className="flex items-center justify-between w-full py-2 text-left">
          <span className="font-medium text-gray-900">{language==='ha'? 'Dillalai' : 'Vendors'}</span>
          {expandedSections.vendor ? <ChevronUpIcon className="w-5 h-5 text-gray-500" /> : <ChevronDownIcon className="w-5 h-5 text-gray-500" />}
        </button>
        {expandedSections.vendor && (
          <div className="mt-3 space-y-2 max-h-56 overflow-y-auto">
            {vendorLoading && <p>Loading...</p>}
            {vendors.map(v => (
              <label key={v.id} className="flex items-center">
                <input type="checkbox" value={v.id} {...register('vendors')} className="rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="ml-2 text-sm text-gray-700">{v.businessName}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <button type="submit" className="btn-primary flex-1">{language==='ha'? 'Aiwatar' :'Apply'}</button>
        <button type="button" onClick={resetFilters} className="btn-primary flex-1 bg-white text-primary border border-primary hover:bg-primary hover:text-white transition-colors">{language==='ha'?'Share':'Clear'}</button>
      </div>
    </form>
  );
};
