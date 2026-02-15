"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        name_th: "",
        description: "",
        description_th: "",
        price: "",
        category: "Weight Management",
        image: "",
        benefits: [],
        benefits_th: [],
        variants: [],
        purity: "",
        form: "",
        sequence: "",
        cas_number: "",
        molar_mass: "",
        quantity: ""
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products?id=${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setFormData({
                        ...data,
                        price: data.price.toString(),
                        benefits: data.benefits || [],
                        benefits_th: data.benefits_th || [],
                        variants: data.variants || [],
                        purity: data.purity || "",
                        form: data.form || "",
                        sequence: data.sequence || "",
                        cas_number: data.cas_number || "",
                        molar_mass: data.molar_mass || "",
                        quantity: data.quantity || ""
                    });
                } else {
                    alert("Failed to load product");
                    router.push('/admin');
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                alert("Error fetching product");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Benefits Handlers
    const handleBenefitChange = (index, value, lang) => {
        const key = lang === 'th' ? 'benefits_th' : 'benefits';
        const newBenefits = [...formData[key]];
        newBenefits[index] = value;
        setFormData(prev => ({ ...prev, [key]: newBenefits }));
    };

    const addBenefit = (lang) => {
        const key = lang === 'th' ? 'benefits_th' : 'benefits';
        setFormData(prev => ({ ...prev, [key]: [...prev[key], ""] }));
    };

    const removeBenefit = (index, lang) => {
        const key = lang === 'th' ? 'benefits_th' : 'benefits';
        const newBenefits = formData[key].filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, [key]: newBenefits }));
    };

    // Variants Handlers
    const handleVariantChange = (index, field, value) => {
        const newVariants = [...formData.variants];
        newVariants[index] = { ...newVariants[index], [field]: value };
        setFormData(prev => ({ ...prev, variants: newVariants }));
    };

    const addVariant = () => {
        setFormData(prev => ({
            ...prev,
            variants: [...prev.variants, { id: Date.now().toString(), name: "", price: 0, quantity: "" }]
        }));
    };

    const removeVariant = (index) => {
        const newVariants = formData.variants.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, variants: newVariants }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/products', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    variants: formData.variants.map(v => ({ ...v, price: parseFloat(v.price) }))
                })
            });

            if (res.ok) {
                router.push('/admin');
                router.refresh();
            } else {
                alert("Failed to update product");
            }
        } catch (error) {
            console.error(error);
            alert("Error updating product");
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl shadow-lg">

                {/* Basic Info */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name (English)</label>
                            <input type="text" name="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" value={formData.name} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name (Thai)</label>
                            <input type="text" name="name_th" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" value={formData.name_th} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select name="category" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" value={formData.category} onChange={handleChange}>
                                <option>Weight Management</option>
                                <option>Injury Repair</option>
                                <option>Anti-Aging</option>
                                <option>Muscle Growth</option>
                                <option>Sexual Health</option>
                                <option>Cognitive</option>
                                <option>Cosmetic & Repair</option>
                                <option>Anti-Aging & Energy</option>
                                <option>Anti-Aging & Muscle</option>
                                <option>Weight & Muscle</option>
                                <option>Cosmetic & Sexual Health</option>
                                <option>Cosmetic</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Product Status</label>
                            <select name="status" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" value={formData.status || 'available'} onChange={handleChange}>
                                <option value="available">Available (Ready to Ship)</option>
                                <option value="preorder">Pre-order</option>
                                <option value="discontinued">Discontinued</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Base Price (USD)</label>
                            <input type="number" name="price" required step="0.01" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" value={formData.price} onChange={handleChange} />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Image URL</label>
                            <input type="text" name="image" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" value={formData.image} onChange={handleChange} placeholder="/placeholder?text=Product" />
                        </div>
                    </div>
                </section>

                {/* Descriptions */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Descriptions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description (English)</label>
                            <textarea name="description" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" value={formData.description} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description (Thai)</label>
                            <textarea name="description_th" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" value={formData.description_th} onChange={handleChange} />
                        </div>
                    </div>
                </section>

                {/* Specifications */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Specifications</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Purity</label>
                            <input type="text" name="purity" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" value={formData.purity} onChange={handleChange} placeholder="≥99% (HPLC)" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Form</label>
                            <input type="text" name="form" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" value={formData.form} onChange={handleChange} placeholder="Lyophilized Powder" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Quantity (Default)</label>
                            <input type="text" name="quantity" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" value={formData.quantity} onChange={handleChange} placeholder="10mg * 10 vials" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Sequence</label>
                            <input type="text" name="sequence" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" value={formData.sequence} onChange={handleChange} placeholder="Protected Information" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">CAS Number</label>
                            <input type="text" name="cas_number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" value={formData.cas_number} onChange={handleChange} placeholder="N/A" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Molar Mass</label>
                            <input type="text" name="molar_mass" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" value={formData.molar_mass} onChange={handleChange} placeholder="Variable" />
                        </div>
                    </div>
                </section>

                {/* Benefits */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Key Benefits</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* English Benefits */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-medium text-gray-700">Benefits (English)</label>
                                <button type="button" onClick={() => addBenefit('en')} className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded">+ Add</button>
                            </div>
                            {formData.benefits.map((benefit, index) => (
                                <div key={index} className="flex gap-2">
                                    <input type="text" className="block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm" value={benefit} onChange={(e) => handleBenefitChange(index, e.target.value, 'en')} />
                                    <button type="button" onClick={() => removeBenefit(index, 'en')} className="text-red-500 hover:text-red-700 px-2">×</button>
                                </div>
                            ))}
                        </div>
                        {/* Thai Benefits */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-medium text-gray-700">Benefits (Thai)</label>
                                <button type="button" onClick={() => addBenefit('th')} className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded">+ Add</button>
                            </div>
                            {formData.benefits_th.map((benefit, index) => (
                                <div key={index} className="flex gap-2">
                                    <input type="text" className="block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm" value={benefit} onChange={(e) => handleBenefitChange(index, e.target.value, 'th')} />
                                    <button type="button" onClick={() => removeBenefit(index, 'th')} className="text-red-500 hover:text-red-700 px-2">×</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Variants */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h2 className="text-xl font-semibold text-gray-800">Variants (Options)</h2>
                        <button type="button" onClick={addVariant} className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary-dark">Add Variant</button>
                    </div>
                    <div className="space-y-4">
                        {formData.variants.map((variant, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 items-end">
                                <div className="flex-1 w-full">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Name (e.g. 5mg)</label>
                                    <input type="text" className="block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm" value={variant.name} onChange={(e) => handleVariantChange(index, 'name', e.target.value)} />
                                </div>
                                <div className="w-full md:w-32">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Price ($)</label>
                                    <input type="number" step="0.01" className="block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm" value={variant.price} onChange={(e) => handleVariantChange(index, 'price', e.target.value)} />
                                </div>
                                <div className="w-full md:w-40">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Stock Status</label>
                                    <select
                                        className="block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm"
                                        value={variant.stock_status || 'in_stock'}
                                        onChange={(e) => handleVariantChange(index, 'stock_status', e.target.value)}
                                    >
                                        <option value="in_stock">In Stock</option>
                                        <option value="out_of_stock">Out of Stock</option>
                                        <option value="coming_soon">Coming Soon</option>
                                    </select>
                                </div>
                                <div className="flex-1 w-full">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Quantity/Stock Note</label>
                                    <input type="text" className="block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm" value={variant.quantity} onChange={(e) => handleVariantChange(index, 'quantity', e.target.value)} placeholder="5mg * 10 vials" />
                                </div>
                                <button type="button" onClick={() => removeVariant(index)} className="text-red-500 hover:text-red-700 pb-2 md:pb-0">Delete</button>
                            </div>
                        ))}
                        {formData.variants.length === 0 && <p className="text-gray-500 text-sm italic">No variants added. Base price will be used.</p>}
                    </div>
                </section>

                <div className="flex justify-end gap-3 pt-6 border-t">
                    <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button type="submit" className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Save Changes</button>
                </div>
            </form>
        </div>
    );
}
