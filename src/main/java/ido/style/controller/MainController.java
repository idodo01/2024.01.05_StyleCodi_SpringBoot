package ido.style.controller;

import ido.style.dto.CategoryDTO;
import ido.style.dto.ProductDTO;
import ido.style.dto.StyleCategoryDTO;
import ido.style.dto.StyleProductDTO;
import ido.style.service.ProductService;
import ido.style.service.StyleProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class MainController {
    @Autowired
    private ProductService productService;
    @Autowired
    private StyleProductService styleProductService;


    @GetMapping("/") // localhost:8080
    public String get_home(Model model){
        List<StyleCategoryDTO> styleCategories = styleProductService.get_categories();
        List<CategoryDTO> categories = productService.get_categories();

        model.addAttribute("styleCategories", styleCategories);
        model.addAttribute("categories", categories);
        return "main/home"; // 홈페이지로 가라
    }

    // 스타일 상품 리스트 화면
    @GetMapping("/styleProduct")
    public String get_stylecateogry(
            @RequestParam(defaultValue = "1") Integer categoryNo,
            String sort,
            Model model
    ){
        List<StyleProductDTO> styleProducts = styleProductService.get_style_products(categoryNo, sort);

        List<StyleCategoryDTO> styleCategories = styleProductService.get_categories();
        List<CategoryDTO> categories = productService.get_categories();

        model.addAttribute("styleProducts", styleProducts);
        model.addAttribute("styleCategories", styleCategories);
        model.addAttribute("categories", categories);

        return "main/styleCategory";
    }

    // 스타일 상품 하나의 화면
    @GetMapping("/styleProduct/{productNo}")
    public String get_styleProduct(
            @PathVariable Integer productNo,
            Model model
    ) {
        StyleProductDTO styleProduct = styleProductService.get_style_product(productNo);

        List<CategoryDTO> categories = productService.get_categories();
        List<StyleCategoryDTO> styleCategories = styleProductService.get_categories();

        model.addAttribute("styleProduct", styleProduct);
        model.addAttribute("categories", categories);
        model.addAttribute("styleCategories", styleCategories);

        return "main/styleProduct";
    }


    // 모든 상품 리스트 화면
    @GetMapping("/product")
    public String get_cateogry(
            @RequestParam(defaultValue = "1") Integer categoryNo,
            String sort,
            Model model
    ){
        List<ProductDTO> products = productService.get_products(categoryNo, sort);


        List<StyleCategoryDTO> styleCategories = styleProductService.get_categories();
        List<CategoryDTO> categories = productService.get_categories();

        model.addAttribute("products", products);

        model.addAttribute("styleCategories", styleCategories);
        model.addAttribute("categories", categories);

        return "main/category";
    }


    // 상품 하나의 화면
    @GetMapping("/product/{productNo}")
    public String get_product(
            @PathVariable Integer productNo,
            Model model
    ) {
        ProductDTO product = productService.get_product(productNo);

        List<CategoryDTO> categories = productService.get_categories();
        List<StyleCategoryDTO> styleCategories = styleProductService.get_categories();

        model.addAttribute("product", product);
        model.addAttribute("categories", categories);
        model.addAttribute("styleCategories", styleCategories);

        return "main/product";
    }

    /****************************************************************************/
    // 스타일 스냅
    @GetMapping("/styles")
    public String get_styles(
            @RequestParam(defaultValue = "1") Integer categoryNo,
            String sort,
            Model model
    ){
        List<ProductDTO> products = productService.get_products(categoryNo, sort);
        List<CategoryDTO> categories = productService.get_categories();
        List<StyleCategoryDTO> styleCategories = styleProductService.get_categories();
        model.addAttribute("products", products);
        model.addAttribute("categories", categories);
        model.addAttribute("styleCategories", styleCategories);
        return "main/styles";
    }

    // 스타일 스냅 - 스타일 맵 만들기
    @GetMapping("/styles-map")
    public String get_styles_map(
            @RequestParam(defaultValue = "1") Integer categoryNo,
            String sort,
            Model model
    ){
        List<ProductDTO> products = productService.get_products(categoryNo, sort);
        List<CategoryDTO> categories = productService.get_categories();
        List<StyleCategoryDTO> styleCategories = styleProductService.get_categories();
        model.addAttribute("products", products);
        model.addAttribute("categories", categories);
        model.addAttribute("styleCategories", styleCategories);
        return "main/styles-map";
    }

    // 스타일 스냅 - 스타일 맵 만들기
    @GetMapping("/styles-map2")
    public String get_styles_map2(
            @RequestParam(defaultValue = "1") Integer categoryNo,
            String sort,
            Model model
    ){
        List<ProductDTO> products = productService.get_products(categoryNo, sort);
        List<CategoryDTO> categories = productService.get_categories();
        List<StyleCategoryDTO> styleCategories = styleProductService.get_categories();
        model.addAttribute("products", products);
        model.addAttribute("categories", categories);
        model.addAttribute("styleCategories", styleCategories);
        return "main/styles-map2";
    }

    // 스타일 스냅 - 스토어
    @GetMapping("/styles-store")
    public String get_styles_store(
            @RequestParam(defaultValue = "1") Integer categoryNo,
            String sort,
            Model model
    ){
        List<ProductDTO> products = productService.get_products(categoryNo, sort);
        List<CategoryDTO> categories = productService.get_categories();
        List<StyleCategoryDTO> styleCategories = styleProductService.get_categories();
        model.addAttribute("products", products);
        model.addAttribute("categories", categories);
        model.addAttribute("styleCategories", styleCategories);
        return "main/styles-store";
    }



}
